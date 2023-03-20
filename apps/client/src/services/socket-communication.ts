import {
  PROTO_AUTH_TOKEN_TRANSFER,
  PROTO_CREATE_LOBBY_ACCEPT,
  PROTO_CREATE_LOBBY_REQUEST,
  PROTO_JOIN_LOBBY_ACCEPT,
  PROTO_JOIN_LOBBY_REQUEST,
  REQUEST_WAITING_TIME,
} from '@razor/constants';
import { AuthToken, InitialClientData, InitialServerData } from '@razor/models';
import { io, Socket } from 'socket.io-client';

import { PubSubEvents } from '../models';
import { pubsub } from '../utils/pubsub';

const SOCKET_ENDPOINT =
  process.env['NX_SOCKET_ENDPOINT'] || 'http://localhost:3000';
let authToken = '';

const socket = io(SOCKET_ENDPOINT, {
  auth: {
    token: authToken,
  },
  autoConnect: false,
  withCredentials: true,
}) as Socket & { auth: { token: AuthToken } };

socket.on('connect', () => {
  console.log('connected');
});

export const endSocket = (): void => {
  socket.disconnect();
  socket.removeAllListeners();
};

const initializeSocket = (): void => {
  socket.auth.token = authToken;
  socket.connect();
  socket.on('connect_error', () => {
    alert('Connection error');
    endSocket();
  });
  socket.on(PROTO_AUTH_TOKEN_TRANSFER, (token: string) => {
    authToken = token;
  });
};

export const requestToJoinRoom = ({
  playerName,
  roomId,
}: InitialClientData): Promise<string> => {
  initializeSocket();
  socket.emit(PROTO_JOIN_LOBBY_REQUEST, { playerName, roomId });
  return new Promise((resolve, reject) => {
    const receiver = (data: InitialServerData): void => {
      // remove `T:` part from the tournament id.
      const roomId = data.tournamentId.slice(2);
      if (roomId) {
        pubsub.publish(PROTO_JOIN_LOBBY_ACCEPT, data);
        resolve(roomId);
      } else {
        reject('Request failed');
      }
    };
    socket.once(PROTO_JOIN_LOBBY_ACCEPT, receiver);

    setTimeout(() => {
      socket.off(PROTO_JOIN_LOBBY_ACCEPT, receiver);
      reject('Request timed out');
    }, REQUEST_WAITING_TIME);
  });
};

export const requestToCreateRoom = ({
  playerName,
}: InitialClientData): Promise<string> => {
  initializeSocket();
  socket.emit(PROTO_CREATE_LOBBY_REQUEST, { playerName });
  return new Promise((resolve, reject) => {
    const receiver = (data: InitialServerData): void => {
      // remove `T:` part from the tournament id.
      const roomId = data.tournamentId.slice(2);
      if (roomId) {
        pubsub.publish(PROTO_CREATE_LOBBY_ACCEPT, data);
        resolve(roomId);
      } else {
        reject('Request failed');
      }
    };
    socket.once(PROTO_CREATE_LOBBY_ACCEPT, receiver);

    setTimeout(() => {
      socket.off(PROTO_CREATE_LOBBY_ACCEPT, receiver);
      reject('Request timed out');
    }, REQUEST_WAITING_TIME);
  });
};

socket.onAny((event, ...args) => {
  if (
    event !== PROTO_CREATE_LOBBY_ACCEPT &&
    event !== PROTO_JOIN_LOBBY_ACCEPT
  ) {
    pubsub.publish(event, { args });
  }
});

// If `Send Data To Server` event is published, then this function will send data to the server.
const sendData = ({
  protocol,
  data,
}: {
  protocol: string;
  data: object;
}): void => {
  socket.emit(protocol, data);
};
pubsub.subscribe(PubSubEvents.SendDataToServer, sendData);
