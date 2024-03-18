import {
  InitialClientData,
  InitialServerData,
  JoinLobbyFailures,
  SocketProtocols,
} from '@razor/models';

import { ToastType } from '../../components';
import { Connection } from '../../constants';
import { addToast } from '../../utils/globalToastManager';
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

    // TODO: Use pubsub instead
    socket.once(SocketProtocols.JoinLobbyReject, data => {
      const { message } = data;
      clearTimeout(waitingTimeout);

      let toastMessage = '',
        toastTitle = '';

      switch (message) {
        case JoinLobbyFailures.PlayerIdInvalid:
          savedData.reset();
          toastTitle = 'Error';
          toastMessage = 'Reconnecting to the server...';
          break;
        case JoinLobbyFailures.TournamentNotFound:
          toastTitle = 'Room not found';
          toastMessage =
            'Room you are trying to join is not found, please check the room id.';
          break;
        default:
          toastTitle = 'Error';
          toastMessage = 'Unknown error';
      }

      addToast({
        title: toastTitle,
        message: toastMessage,
        type: ToastType.Error,
        icon: 'close',
      });

      reject(data.message);
    });

    const waitingTimeout = setTimeout(() => {
      socket.off(SocketProtocols.JoinLobbyAccept, receiver);
      addToast({
        title: 'Timeout',
        message: 'Request timed out. Server is unreachable.',
        type: ToastType.Error,
        icon: 'close',
      });

      reject('Request timed out');
    }, Connection.REQUEST_WAITING_TIME_FOR_CLIENT);
  });

  return promise;
};
