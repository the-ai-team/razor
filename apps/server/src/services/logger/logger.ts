import {
  PlayerId,
  playerIdSchema,
  RaceId,
  socketId,
  TournamentId,
} from '@razor/models';

import { tokenPlayerMap } from '../../stores';

import { cloudLogger } from './cloud-logger';
import { localLogger } from './local-logger';

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

export interface ContextOutput {
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public error(message: string, context: ContextOutput, data?: any): void {
    wlogger.error(message, { context, data });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public warn(message: string, context: ContextOutput, data?: any): void {
    wlogger.warn(message, { context, data });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public info(message: string, context: ContextOutput, data?: any): void {
    wlogger.info(message, { context, data });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public debug(message: string, context: ContextOutput, data?: any): void {
    wlogger.debug(message, { context, ...data });
  }
}
