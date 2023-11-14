import { RECONNECT_WAITING_TIME } from '@razor/constants';
import {
  AuthToken,
  protocolToSchemaMap,
  SocketProtocols,
  SocketProtocolsTypes,
} from '@razor/models';
import { roomIdToTournamentId } from '@razor/util';
import { io, Socket } from 'socket.io-client';

import { Connection } from '../constants';
import { ClientUniqueEvents, SendDataToServerModel } from '../models';
import { pubsub } from '../utils/pubsub';
import { savedData } from '../utils/save-player-data';

import { requestToJoinRoom } from './handlers/join-room';

const SOCKET_ENDPOINT =
  import.meta.env.VITE_SOCKET_ENDPOINT || 'http://localhost:3000';

interface SocketFormat extends Socket {
  auth: {
    token: AuthToken;
  };
}

export const socket = io(SOCKET_ENDPOINT, {
  auth: {
    token: savedData.authToken,
  },
  autoConnect: false,
  withCredentials: true,
}) as SocketFormat;

export const endSocket = (): void => {
  socket.disconnect();
  savedData.authToken = null;
  savedData.savedPlayerName = null;
  savedData.savedPlayerId = null;
  savedData.savedRoomId = null;
};

export const initializeSocket = (): void => {
  socket.auth.token = savedData.authToken ?? '';
  socket.connect();
  socket.on('connect_error', () => {
    alert('Connection error');
    endSocket();
  });
  socket.on('connect', () => {
    console.log('connected');
  });
  socket.on(SocketProtocols.AuthTokenTransfer, (token: string) => {
    savedData.authToken = token;
  });
};

const tryReconnect = (reason: Socket.DisconnectReason): void => {
  if (reason === 'io server disconnect') {
    console.log('Server is down');
  }

  if (reason === 'io client disconnect') {
    console.log('Disconnected by client');
  }

  // Reconnect only if not user disconnected intentionally (from a client trigger or server side trigger).
  // Connection issue is considered as a unintentional disconnect.
  // https://socket.io/docs/v3/client-socket-instance/#disconnect
  if (reason !== 'io server disconnect' && reason !== 'io client disconnect') {
    console.log(`Disconnected by ${reason}`);

    if (!savedData.savedRoomId || !savedData.savedPlayerName) {
      return;
    }

    const reconnector = setInterval(async () => {
      try {
        console.log('Trying to reconnect...');
        if (savedData.savedRoomId && savedData.savedPlayerName) {
          await requestToJoinRoom({
            playerName: savedData.savedPlayerName,
            roomId: savedData.savedRoomId,
          });
        }
        clearInterval(reconnector);
      } catch (error) {
        console.error(error);
      }
    }, Connection.RECONNECT_TRY_INTERVAL);

    // If the user doesn't reconnect in RECONNECT_WAITING_TIME, stop trying.
    const waitingTimeout = setTimeout(() => {
      console.log('Reconnect timed out');
      clearInterval(reconnector);
      savedData.authToken = null;
      savedData.savedPlayerName = null;
      savedData.savedPlayerId = null;
      savedData.savedRoomId = null;
    }, RECONNECT_WAITING_TIME);

    socket.once('connect', () => {
      console.log('Reconnected');
      clearInterval(reconnector);
      clearTimeout(waitingTimeout);
    });
  }
};

socket.on('disconnect', reason => tryReconnect(reason));

interface validateSchemaArgs<T> {
  event: SocketProtocolsTypes;
  data: T;
}

function validateSchema<T>({ event, data }: validateSchemaArgs<T>): boolean {
  try {
    const schema = protocolToSchemaMap.get(event);
    if (!schema) {
      console.log(`Unrecognized event: ${event}`);
      return false;
    }

    schema.parse(data);
    return true;
  } catch (error) {
    // TODO: implement logger service for client
    console.log(`Received data invalid. (zod-error) ${error}`, {
      protocolName: event,
      protocolData: data,
    });
    return false;
  }
}

socket.onAny((event, data) => {
  const isValid = validateSchema({ event, data });
  if (!isValid) {
    return;
  }

  if (!savedData.savedRoomId || !savedData.savedPlayerId) {
    // TODO: navigate to home page
    return;
  }

  if (
    event !== SocketProtocols.CreateLobbyAccept &&
    event !== SocketProtocols.JoinLobbyAccept
  ) {
    const tournamentId = roomIdToTournamentId(savedData.savedRoomId);
    pubsub.publish(event, {
      tournamentId,
      savedPlayerId: savedData.savedPlayerId,
      data,
    });
    console.log(event, data);
  }
});

// If `Send Data To Server` event is published, then this function will send data to the server.
const sendData = ({ protocol, data }: SendDataToServerModel): void => {
  socket.emit(protocol, data);
};
pubsub.subscribe(ClientUniqueEvents.SendDataToServer, sendData);
