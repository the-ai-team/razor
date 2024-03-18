import { CLIENT_TYPE_LOG_INTERVAL } from '@razor/constants';
import {
  AllProtocolToTypeMap,
  PlayerLog,
  RaceId,
  SocketProtocols,
} from '@razor/models';
import { store } from '@razor/store';

import { getSavedPlayerId } from '../../utils/save-player-id';
import { socket } from '../socket-communication';

class TypeLogsQueue {
  private logs: PlayerLog[] = [];

  public addLog(log: PlayerLog): void {
    this.logs.push(log);
  }

  public getQueue(): PlayerLog[] {
    return this.logs;
  }

  public clearQueue(): void {
    this.logs = [];
  }
}

const typeLogsQueue = new TypeLogsQueue();

/** To send a type log to server.
 *
 * @param lastTypedCharIndex - Last typed character index.
 * (Use 0 for the initial type log, which is used to notify the server that the player has started typing.)
 */
export const sendTypeLog = (
  lastTypedCharIndex: number,
  raceId: RaceId,
): void => {
  const playerLog: PlayerLog = {
    timestamp: Date.now(),
    textLength: lastTypedCharIndex,
  };
  typeLogsQueue.addLog(playerLog);

  // Send type log to local store.
  const playerId = getSavedPlayerId();
  if (playerId) {
    store.dispatch.game.sendTypeLog({
      playerLog,
      raceId,
      playerId,
    });
  }
};

// Send type logs to the server in a specific interval.
export const typeLogPusher = (raceId: RaceId): (() => void) => {
  const timer = setInterval(() => {
    const logs = typeLogsQueue.getQueue();

    if (logs.length > 0) {
      const data: AllProtocolToTypeMap[SocketProtocols.SendTypeLog] = {
        raceId: raceId,
        playerLogs: logs,
      };

      socket.emit(SocketProtocols.SendTypeLog, data);
      typeLogsQueue.clearQueue();
    }
  }, CLIENT_TYPE_LOG_INTERVAL);

  return (): void => {
    clearInterval(timer);
  };
};

export const sendInitialTypeLog = (raceId: RaceId): void => {
  const playerLog: PlayerLog = {
    timestamp: Date.now(),
    textLength: 0,
  };

  const data: AllProtocolToTypeMap[SocketProtocols.SendTypeLog] = {
    raceId: raceId,
    playerLogs: [playerLog],
  };

  socket.emit(SocketProtocols.SendTypeLog, data);

  // Send type log to local store.
  const playerId = getSavedPlayerId();
  if (playerId) {
    store.dispatch.game.sendTypeLog({
      playerLog,
      raceId,
      playerId,
    });
  }
};
