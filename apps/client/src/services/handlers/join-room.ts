import {
  InitialClientData,
  InitialServerData,
  SocketProtocols,
} from '@razor/models';

import { Connection } from '../../constants';
import { pubsub } from '../../utils/pubsub';
import { savedData } from '../../utils/save-player-data';
import { initializeSocket, socket } from '../socket-communication';

export const requestToJoinRoom = ({
  playerName,
  roomId,
}: InitialClientData): Promise<string> => {
  initializeSocket();
  socket.emit(SocketProtocols.JoinLobbyRequest, { playerName, roomId });

  const promise: Promise<string> = new Promise((resolve, reject) => {
    const receiver = (data: InitialServerData): void => {
      // remove `T:` part from the tournament id.
      const roomIdFromServer = data.tournamentId.slice(2);

      if (roomIdFromServer) {
        // For socket communication uses.
        savedData.savedRoomId = roomIdFromServer;
        savedData.savedPlayerId = data.playerId;
        savedData.savedPlayerName =
          data.snapshot.playersModel[data.playerId].name;

        pubsub.publish(SocketProtocols.JoinLobbyAccept, data);
        clearTimeout(waitingTimeout);
        resolve(roomIdFromServer);
      } else {
        reject('Request failed');
      }
    };
    socket.once(SocketProtocols.JoinLobbyAccept, receiver);

    const waitingTimeout = setTimeout(() => {
      socket.off(SocketProtocols.JoinLobbyAccept, receiver);
      reject('Request timed out');
    }, Connection.REQUEST_WAITING_TIME_FOR_CLIENT);
  });

  return promise;
};
