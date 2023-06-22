import { SocketProtocols } from '@razor/models';

import { socket } from '../socket-communication';

export function startRace(): void {
  socket.emit(SocketProtocols.StartRaceRequest, {});
}
