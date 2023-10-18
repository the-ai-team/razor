import { AllProtocolToTypeMap, SocketProtocols } from '@razor/models';

import { socket } from '../socket-communication';

export function raceTimeout(): void {
  type TimeoutData = AllProtocolToTypeMap[SocketProtocols.InformTimeout];
  const data: TimeoutData = {
    timestamp: Date.now(),
  };
  socket.emit(SocketProtocols.InformTimeout, data);

  // store end race should be called after server notifies the timeout
}
