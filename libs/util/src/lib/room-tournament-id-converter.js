"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roomIdToTournamentId = exports.tournamentIdToRoomId = void 0;
const tournamentIdToRoomId = (tournamentId) => {
    return tournamentId.slice(2);
};
exports.tournamentIdToRoomId = tournamentIdToRoomId;
const roomIdToTournamentId = (roomId) => {
    return `T:${roomId}`;
};
exports.roomIdToTournamentId = roomIdToTournamentId;
//# sourceMappingURL=room-tournament-id-converter.js.map