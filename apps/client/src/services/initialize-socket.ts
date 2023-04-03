import {
  PROTO_AUTH_TOKEN_TRANSFER,
  PROTO_JOIN_LOBBY_REQUEST,
} from '@razor/constants';
import { AuthToken, InitialClientData } from '@razor/models';
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

export const initializeSocket = ({
  playerName,
  roomId,
  onTokenReceived,
}: InitialClientData): void => {
  socket.auth.token = authToken;
  socket.connect();
  socket.on('connect_error', () => {
    alert('Connection error');
    endSocket();
  });
  // TODO: emit create room request if roomId is provided
  socket.emit(PROTO_JOIN_LOBBY_REQUEST, { playerName, roomId });
  socket.on(PROTO_AUTH_TOKEN_TRANSFER, (token: string) => {
    authToken = token;
    // TODO: should wait navigation function until `PROTO_JOIN_LOBBY_ACCEPT` protocol receive (server should accept the join lobby request)
    onTokenReceived();
  });
};

export const endSocket = (): void => {
  socket.disconnect();
};

socket.onAny((event, ...args) => {
  pubsub.publish(event, { args });
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
