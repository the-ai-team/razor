import { RoomId, TournamentId } from '@razor/models';

export const tournamentIdToRoomId = (tournamentId: TournamentId): RoomId => {
  return tournamentId.slice(2);
};

export const roomIdToTournamentId = (roomId: RoomId): TournamentId => {
  return `T:${roomId}`;
};
