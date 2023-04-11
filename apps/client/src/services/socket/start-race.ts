import { socketProtocols } from '@razor/models';

import { socket } from '../socket-communication';

export function startRace(): void {
  socket.emit(socketProtocols.StartRaceRequest, {});
}
