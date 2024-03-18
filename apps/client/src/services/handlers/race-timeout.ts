import { AllProtocolToTypeMap, RaceId, SocketProtocols } from '@razor/models';

import { socket } from '../socket-communication';

export function raceTimeout(raceId: RaceId): void {
  type TimeoutData = AllProtocolToTypeMap[SocketProtocols.InformTimeout];
  const data: TimeoutData = {
    raceId,
  };
  socket.emit(SocketProtocols.InformTimeout, data);

  // store end race should be called after server notifies back the timeout
}
