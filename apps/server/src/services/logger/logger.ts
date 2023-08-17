import {
  AppTournamentState,
  PlayerId,
  playerIdSchema,
  RaceId,
  SocketId,
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
  identifier: PlayerId | SocketId;
}

export interface ContextOutput {
  subject: string;
  // both playerId and socketId won't be available at the same time.
  playerId?: PlayerId;
  // socket Id will be available only for initial events.
  socketId?: SocketId;
  domainId?: TournamentId | RaceId | null;
}

export class Logger {
  constructor(protected subject: string) {}

  public createContext({ identifier }: ContextInput): ContextOutput {
    let domainId: TournamentId | RaceId;

    let socketId = '';
    let playerId: PlayerId;

    // When creating context both playerId and socketId can be used as identifier.
    // here we are checking whether identifier is playerId or socketId.
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
  public error<T extends object>(
    message: string,
    context: ContextOutput,
    additionalData?: T,
  ): void {
    wlogger.error(message, { context, ...additionalData });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public warn<T extends object>(
    message: string,
    context: ContextOutput,
    additionalData?: T,
  ): void {
    wlogger.warn(message, { context, ...additionalData });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public info<T extends object>(
    message: string,
    context: ContextOutput,
    additionalData?: T,
  ): void {
    wlogger.info(message, { context, ...additionalData });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public debug<T extends object>(
    message: string,
    context: ContextOutput,
    additionalData?: T,
  ): void {
    wlogger.debug(message, { context, ...additionalData });
  }
}
