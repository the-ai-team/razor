import {
  AppTournamentState,
  PlayerId,
  playerIdSchema,
  RaceId,
  socketId,
  TournamentId,
} from '@razor/models';
import { store } from '@razor/store';

import { tokenPlayerMap } from '../../stores';

import { cloudLogger } from './cloud-logger';
import { localLogger } from './local-logger';

let wlogger = null;
if (process.env.NODE_ENV === 'development') {
  wlogger = localLogger();
} else {
  wlogger = cloudLogger();
}

interface ContextInput {
  identifier: PlayerId | socketId;
}

export interface ContextOutput {
  subject: string;
  playerId: PlayerId;
  socketId: socketId;
  domainId?: TournamentId | RaceId | null;
}

export class Logger {
  constructor(protected subject: string) {}

  public createContext({ identifier }: ContextInput): ContextOutput {
    let domainId: TournamentId | RaceId;

    let socketId = '';
    let playerId: PlayerId;
    if (playerIdSchema.safeParse(identifier).success) {
      playerId = identifier as PlayerId;
      socketId = tokenPlayerMap.getSocketIdByPlayerId(identifier as PlayerId);

      // Update domain id as race id if tournament is in race state. else update as tournament id.
      const game = store.getState().game;
      const tournamentId = game.playersModel[identifier]?.tournamentId || null;
      if (
        game.tournamentsModel[tournamentId]?.state === AppTournamentState.Race
      ) {
        const raceIds = game.tournamentsModel[tournamentId].raceIds;
        const raceId = raceIds[raceIds.length - 1];
        domainId = raceId;
      } else {
        domainId = tournamentId;
      }
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
