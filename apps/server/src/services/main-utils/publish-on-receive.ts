import {
  PROTO_CREATE_LOBBY_REQUEST,
  PROTO_JOIN_LOBBY_REQUEST,
} from '@razor/constants';
import { Socket } from 'socket.io';

import { tokenPlayerMap } from '../../stores';
import { ContextOutput, Logger } from '../logger';
import {} from '../logger';
import { pubsub } from '../pubsub';

interface receiverArgs<T> {
  event: string;
  data: T;
  socket: Socket;
}

const logger = new Logger('receiver');

export function publishOnReceive<T>({
  event,
  data,
  socket,
}: receiverArgs<T>): void {
  let context: ContextOutput;
  if (
    event === PROTO_JOIN_LOBBY_REQUEST ||
    event === PROTO_CREATE_LOBBY_REQUEST
  ) {
    // If player is new, player may not have playerId yet. So we use socket id to create context and publish event.
    // Player id will be created in the controller.
    const socketId = socket.id;
    context = logger.createContext({ identifier: socketId });
    pubsub.publish(event, { data, context });
  } else {
    const playerId = tokenPlayerMap.getPlayerIdBySocketId(socket.id);
    context = logger.createContext({ identifier: playerId });
    pubsub.publish(event, { data, context });
  }
  logger.info(`Protocol: ${event} | Message received.`, context, data);
}
