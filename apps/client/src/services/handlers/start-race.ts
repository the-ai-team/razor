import { SocketProtocols } from '@razor/models';

import { Connection } from '../../constants';
import { socket } from '../socket-communication';

export function requestToStartRace(): Promise<void> {
  socket.emit(SocketProtocols.StartRaceRequest, {});

  const promise: Promise<void> = new Promise((resolve, reject) => {
    const receiver = (): void => {
      socket.off(SocketProtocols.StartRaceAccept, receiver);
      clearTimeout(waitingTimeout);
      resolve();
    };
    socket.once(SocketProtocols.StartRaceAccept, receiver);

    const waitingTimeout = setTimeout(() => {
      socket.off(SocketProtocols.StartRaceAccept, receiver);
      // TODO: Error classes and error handler for timeout, disconnect, etc.
      reject('Request timed out');
    }, Connection.REQUEST_WAITING_TIME_FOR_CLIENT);
  });

  return promise;
}
