import { REQUEST_WAITING_TIME } from '@razor/constants';
import { socketProtocols } from '@razor/models';

import { socket } from '../socket-communication';

export function requestToStartRace(): Promise<void> {
  socket.emit(socketProtocols.StartRaceRequest, {});

  const promise: Promise<void> = new Promise((resolve, reject) => {
    const receiver = (): void => {
      socket.off(socketProtocols.StartRaceAccept, receiver);
      clearTimeout(waitingTimeout);
      resolve();
    };
    socket.once(socketProtocols.StartRaceAccept, receiver);

    const waitingTimeout = setTimeout(() => {
      socket.off(socketProtocols.StartRaceAccept, receiver);
      // TODO: Error classes and error handler for timeout, disconnect, etc.
      reject('Request timed out');
    }, REQUEST_WAITING_TIME);
  });

  return promise;
}
