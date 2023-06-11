import { z } from 'zod';

import { AppStateModel } from '../state';

import { PlayerId } from './player';
import { initialClientDataSchema } from './protocol-schemas';
import { TournamentId } from './tournament';

// Data sent from the client to the server with socket establishment
export type InitialClientData = z.infer<typeof initialClientDataSchema>;

// This interface is used to sync the client with the server.
export type Snapshot = Omit<AppStateModel, 'errorLogsModel'>;

// Data sent from the server to the client after socket establishment to sync
// We are avoiding inferring the schema directly because it makes unnecessary type conversions while taking data from store to socket data model
export interface InitialServerData {
  playerId: PlayerId;
  tournamentId: TournamentId;
  /** Game snapshot */
  snapshot: Snapshot;
}
