import { MAX_ERR_LOGS_COUNT } from '@razor/constants';
import {
  AppIdNumberType,
  PlayerId,
  RaceId,
  socketId,
  TournamentId,
} from '@razor/models';
import { generateUid } from '@razor/util';

interface LogInput {
  message: string;
  identifier: PlayerId | socketId;
  domainId?: TournamentId | RaceId;
}

enum LogType {
  Message = 'message',
  Error = 'error',
}

interface Log extends LogInput {
  type: LogType;
  id: string;
  timestamp: number;
}

export class Logger {
  private logs: Array<Log> = [];
  constructor(protected subject: string) {}

  private clearOldLogs(): void {
    if (this.logs.length > MAX_ERR_LOGS_COUNT) {
      this.logs = this.logs.slice(0, MAX_ERR_LOGS_COUNT);
    }
  }

  message({ message, identifier, domainId }: LogInput): void {
    const timestamp = new Date().getTime();
    const id = generateUid(AppIdNumberType.General);
    const type = LogType.Message;
    const log = { type, id, timestamp, message, identifier, domainId };
    this.logs.push(log);
    this.clearOldLogs();
    if (process.env.NODE_ENV == 'development') {
      console.log(
        `🗨 [${this.subject}] (${
          domainId ? domainId + '>' : ''
        }${identifier}) ${message}`,
      );
    }
  }

  error({ message, identifier, domainId }: LogInput): void {
    const timestamp = new Date().getTime();
    const id = generateUid(AppIdNumberType.General);
    const type = LogType.Error;
    const log = { type, id, timestamp, message, identifier, domainId };
    this.logs.push(log);
    this.clearOldLogs();
    console.log(
      `🟥 [${this.subject}] (${
        domainId ? domainId + '>' : ''
      }${identifier}) ${message}`,
    );
  }
}
