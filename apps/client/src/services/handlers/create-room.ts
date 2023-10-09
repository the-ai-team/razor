import { REQUEST_WAITING_TIME } from '@razor/constants';
import {
  InitialClientData,
  InitialServerData,
  playerIdSchema,
  socketProtocols,
  stateModelSchema,
  tournamentIdSchema,
} from '@razor/models';

import { pubsub } from '../../utils/pubsub';
import { savePlayerId } from '../../utils/save-player-id';
import { initializeSocket, savedData, socket } from '../socket-communication';

export const requestToCreateRoom = ({
  playerName,
}: InitialClientData): Promise<string> => {
  initializeSocket();
  socket.emit(socketProtocols.CreateLobbyRequest, { playerName });
  return new Promise((resolve, reject) => {
    const receiver = (data: InitialServerData): void => {
      // Data validation
      const validation =
        !stateModelSchema.safeParse(data.snapshot).success ||
        !tournamentIdSchema.safeParse(data.tournamentId).success ||
        !playerIdSchema.safeParse(data.playerId).success;
      if (validation) {
        reject('Invalid data');
        return;
      }

      // remove `T:` part from the tournament id.
      const roomIdFromServer = data.tournamentId.slice(2);
      if (roomIdFromServer) {
        // For socket communication uses.
        savedData.savedRoomId = roomIdFromServer;
        savedData.savedPlayerId = data.playerId;
        savedData.savedPlayerName =
          data.snapshot.playersModel[data.playerId].name;

        // For local store dispatch uses.
        savePlayerId(data.playerId);
        pubsub.publish(socketProtocols.CreateLobbyAccept, data);
        clearTimeout(waitingTimeout);
        resolve(roomIdFromServer);
      } else {
        reject('Request failed');
      }
    };
    socket.once(socketProtocols.CreateLobbyAccept, receiver);

    const waitingTimeout = setTimeout(() => {
      socket.off(socketProtocols.CreateLobbyAccept, receiver);
      reject('Request timed out');
    }, REQUEST_WAITING_TIME);
  });
};
