import {
  protocolToSchemaMap,
  socketProtocols,
  SocketProtocolsTypes,
  TournamentId,
} from '@razor/models';
import { store } from '@razor/store';
import { Socket } from 'socket.io';

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
    const schema = protocolToSchemaMap.get(event);
    schema.parse(data);
    return true;
  } catch (error) {
    logger.warn(`Received data invalid. (zod-error) ${error}`, context, {
      protocolName: event,
      protocolData: data,
    });
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
    pubsub.publish(event, { data, context, socketId });
  } else {
    const playerId = tokenPlayerMap.getPlayerIdBySocketId(socket.id);

    if (!playerId) {
      logger.warn('Player not found.', context);
      return;
    }

    // Creating logger context
    context = logger.createContext({ identifier: playerId });

    const isValid = validateSchema({ event, data, context });
    if (!isValid) {
      return;
    }

    // Get allocated socket room id/s (In socket io first id is always individual socket id)
    const socketRoomIds = [...socket.rooms]?.slice(1);
    if (!socketRoomIds) {
      logger.warn('Player not belongs to any rooms.', context);
      return;
    }

    // If player assigned to multiple rooms, we will use the last room id.
    const socketRoomId = socketRoomIds[
      socketRoomIds.length - 1
    ] as TournamentId;

    const game = store.getState().game;

    // Verify room id with tournament id in store.
    const tournament = game.tournamentsModel[socketRoomId];
    if (!tournament) {
      logger.warn(
        'The tournament which related to socket room is not available in the store.',
        context,
      );
      return;
    }

    // Verify whether player belongs to the tournament.
    if (tournament.playerIds.includes(playerId) === false) {
      logger.warn('Player not belongs to the tournament.', context);
      return;
    }

    pubsub.publish(event, {
      data,
      context,
      playerId,
      tournamentId: socketRoomId,
    });
  }
  logger.info(`Protocol: ${event} | Message received.`, context, { data });
}
