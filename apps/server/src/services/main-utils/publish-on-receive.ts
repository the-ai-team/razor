import { socketProtocols, SocketProtocolsTypes } from '@razor/models';
import { Socket } from 'socket.io';

import { protocolSchemaMap } from '../../models';
import { tokenPlayerMap } from '../../stores';
import { ContextOutput, Logger } from '../logger';
import { pubsub } from '../pubsub';

interface receiverArgs<T> {
  event: SocketProtocolsTypes;
  data: T;
  socket: Socket;
}

const logger = new Logger('receiver');

interface validateSchemaArgs<T> {
  event: SocketProtocolsTypes;
  data: T;
  context: ContextOutput;
}

function validateSchema<T>({
  event,
  data,
  context,
}: validateSchemaArgs<T>): boolean {
  try {
    const schema = protocolSchemaMap.get(event);
    schema.parse(data);
    return true;
  } catch (error) {
    const logData = {
      protocolName: event,
      protocolData: data,
      zodMessage: error,
    };
    logger.warn('Received data invalid.', context, logData);
    return false;
  }
}

export function publishOnReceive<T>({
  event,
  data,
  socket,
}: receiverArgs<T>): void {
  let context: ContextOutput;

  if (
    event === socketProtocols.JoinLobbyRequest ||
    event === socketProtocols.CreateLobbyRequest
  ) {
    // If player is new, player may not have playerId yet. So we use socket id to create context and publish event.
    // Player id will be created in the controller.
    const socketId = socket.id;
    context = logger.createContext({ identifier: socketId });

    const isValid = validateSchema({ event, data, context });
    if (!isValid) {
      return;
    }
    pubsub.publish(event, { data, context });
  } else {
    const playerId = tokenPlayerMap.getPlayerIdBySocketId(socket.id);
    context = logger.createContext({ identifier: playerId });

    const isValid = validateSchema({ event, data, context });
    if (!isValid) {
      return;
    }
    pubsub.publish(event, { data, context });
  }
  logger.info(`Protocol: ${event} | Message received.`, context, data);
}
