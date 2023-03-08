import {
  PlayerId,
  playerIdSchema,
  RaceId,
  socketId,
  TournamentId,
} from '@razor/models';
import { tokenPlayerMap } from '../../stores';
import { localLogger } from './local-logger';
import { cloudLogger } from './cloud-logger';

export enum LogLevels {
  Error = 'ERROR',
  Warn = 'WARN',
  Info = 'INFO',
  Debug = 'DEBUG',
}

export const logLevels = {
  [LogLevels.Error]: 0,
  [LogLevels.Warn]: 1,
  [LogLevels.Info]: 2,
  [LogLevels.Debug]: 3,
};

console.log(process.env.NODE_ENV);
let wlogger = null;
if (process.env.NODE_ENV === 'development') {
  wlogger = localLogger();
} else {
  wlogger = cloudLogger();
}

// TODO: Add RoomTournamentMap
interface ContextInput {
  identifier: PlayerId | socketId;
}

interface ContextOutput {
  subject: string;
  playerId: PlayerId;
  socketId: socketId;
  domainId?: TournamentId | RaceId;
}

export class Logger {
  constructor(protected subject: string) {}

  public createContext({ identifier }: ContextInput): ContextOutput {
    // TODO: Add RoomTournamentMap to get domainId
    const domainId = 'T:123456';

    let socketId = '';
    let playerId: PlayerId;
    if (playerIdSchema.safeParse(identifier).success) {
      playerId = identifier as PlayerId;
      socketId = tokenPlayerMap.getSocketIdByPlayerId(identifier as PlayerId);
    } else {
      socketId = identifier;
    }

    return {
      subject: this.subject,
      playerId,
      socketId,
      domainId,
    };
  }

  public error(message: string, context: ContextOutput): void {
    wlogger.error(message, context);
  }

  public warn(message: string, context: ContextOutput): void {
    wlogger.warn(message, context);
  }

  public info(message: string, context: ContextOutput): void {
    wlogger.info(message, context);
  }

  public debug(message: string, context: ContextOutput): void {
    wlogger.debug(message, context);
  }
}