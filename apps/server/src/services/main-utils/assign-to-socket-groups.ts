import { PlayerId } from '@razor/models';

import { socketServer } from '../../main';
import { tokenPlayerMap } from '../../stores';

/** Assign player to socket group of related tournament.
 * Naming socket room with the tournament id. So we can send data to specific lobby(All players in a specific tournament).
 */
export function assignPlayerToSocketGroup(playerId: PlayerId): void {
  const socketId = tokenPlayerMap.getSocketIdByPlayerId(playerId);
  const tournamentId = tokenPlayerMap.getTournamentIdByPlayerId(playerId);
  socketServer.sockets.sockets.get(socketId).join(tournamentId);
}
