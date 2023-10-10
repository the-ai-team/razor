import { CLIENT_TYPE_LOG_INTERVAL } from '@razor/constants';
import {
  AllProtocolToTypeMap,
  PlayerLog,
  RaceId,
  socketProtocols,
} from '@razor/models';

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
export const sendTypeLog = (lastTypedCharIndex: number): void => {
  const playerLog: PlayerLog = {
    timestamp: Date.now(),
    textLength: lastTypedCharIndex,
  };
  typeLogsQueue.addLog(playerLog);
};

// Send type logs to the server in a specific interval.
export const typeLogPusher = (raceId: RaceId): (() => void) => {
  const timer = setInterval(() => {
    const logs = typeLogsQueue.getQueue();

    if (logs.length > 0) {
      const data: AllProtocolToTypeMap[socketProtocols.SendTypeLog] = {
        raceId: raceId,
        playerLogs: logs,
      };

      socket.emit(socketProtocols.SendTypeLog, data);
      typeLogsQueue.clearQueue();
    }
  }, CLIENT_TYPE_LOG_INTERVAL);

  return (): void => {
    clearInterval(timer);
  };
};
