import { RECONNECT_WAITING_TIME, REQUEST_WAITING_TIME } from '@razor/constants';
import {
  AuthToken,
  InitialClientData,
  InitialServerData,
  playerIdSchema,
  SocketProtocols,
  stateModelSchema,
  tournamentIdSchema,
} from '@razor/models';
import { roomIdToTournamentId } from '@razor/util';
import { io, Socket } from 'socket.io-client';

import { ClientUniqueEvents, SendDataToServerModel } from '../models';
import { pubsub } from '../utils/pubsub';

const SOCKET_ENDPOINT =
  import.meta.env.NX_SOCKET_ENDPOINT || 'http://localhost:3000';
let authToken = '';
let savedPlayerName = '';
let savedPlayerId = '';
let savedRoomId = '';

interface SocketFormat extends Socket {
  auth: {
    token: AuthToken;
  };
}

export const socket = io(SOCKET_ENDPOINT, {
  auth: {
    token: authToken,
  },
  autoConnect: false,
  withCredentials: true,
}) as SocketFormat;

export const endSocket = (): void => {
  socket.disconnect();
  authToken = '';
  savedPlayerName = '';
  savedPlayerId = '';
  savedRoomId = '';
};

const initializeSocket = (): void => {
  socket.auth.token = authToken;
  socket.connect();
  socket.on('connect_error', () => {
    alert('Connection error');
    endSocket();
  });
  socket.on('connect', () => {
    console.log('connected');
  });
  socket.on(SocketProtocols.AuthTokenTransfer, (token: string) => {
    authToken = token;
  });
};

const tryReconnect = (reason: Socket.DisconnectReason): void => {
  // Reconnect only if not user disconnected intentionally (from a client trigger or server side trigger).
  // Connection issue is considered as a unintentional disconnect.
  // https://socket.io/docs/v3/client-socket-instance/#disconnect
  if (reason !== 'io server disconnect' && reason !== 'io client disconnect') {
    if (savedRoomId && savedPlayerName) {
      const reconnector = setInterval(async () => {
        try {
          console.log('Reconnecting...');
          await requestToJoinRoom({
            playerName: savedPlayerName,
            roomId: savedRoomId,
          });
          clearInterval(reconnector);
        } catch (error) {
          console.error(error);
        }
      }, REQUEST_WAITING_TIME);

      // If the user doesn't reconnect in RECONNECT_WAITING_TIME, stop trying.
      const waitingTimeout = setTimeout(() => {
        clearInterval(reconnector);
        authToken = '';
        savedPlayerName = '';
        savedPlayerId = '';
        savedRoomId = '';
        // TODO: navigate to home page
      }, RECONNECT_WAITING_TIME);

      socket.once('connect', () => {
        console.log('Reconnected');
        clearInterval(reconnector);
        clearTimeout(waitingTimeout);
      });
    }
  }
};

socket.on('disconnect', reason => tryReconnect(reason));

export const requestToJoinRoom = ({
  playerName,
  roomId,
}: InitialClientData): Promise<string> => {
  initializeSocket();
  socket.emit(SocketProtocols.JoinLobbyRequest, { playerName, roomId });
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
        savedRoomId = roomIdFromServer;
        savedPlayerId = data.playerId;
        savedPlayerName = data.snapshot.playersModel[data.playerId].name;
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
    }, REQUEST_WAITING_TIME);
  });
};

export const requestToCreateRoom = ({
  playerName,
}: InitialClientData): Promise<string> => {
  initializeSocket();
  socket.emit(SocketProtocols.CreateLobbyRequest, { playerName });
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
        savedRoomId = roomIdFromServer;
        savedPlayerId = data.playerId;
        savedPlayerName = data.snapshot.playersModel[data.playerId].name;
        pubsub.publish(SocketProtocols.CreateLobbyAccept, data);
        clearTimeout(waitingTimeout);
        resolve(roomIdFromServer);
      } else {
        reject('Request failed');
      }
    };
    socket.once(SocketProtocols.CreateLobbyAccept, receiver);

    const waitingTimeout = setTimeout(() => {
      socket.off(SocketProtocols.CreateLobbyAccept, receiver);
      reject('Request timed out');
    }, REQUEST_WAITING_TIME);
  });
};

socket.onAny((event, data) => {
  if (
    event !== SocketProtocols.CreateLobbyAccept &&
    event !== SocketProtocols.JoinLobbyAccept
  ) {
    const tournamentId = roomIdToTournamentId(savedRoomId);
    pubsub.publish(event, { tournamentId, savedPlayerId, data });
    console.log(event, data);
  }
});

// If `Send Data To Server` event is published, then this function will send data to the server.
const sendData = ({ protocol, data }: SendDataToServerModel): void => {
  socket.emit(protocol, data);
};
pubsub.subscribe(ClientUniqueEvents.SendDataToServer, sendData);
