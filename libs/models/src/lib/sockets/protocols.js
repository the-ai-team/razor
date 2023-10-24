"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketProtocols = void 0;
/** Socket communication direction */
var TransferDirection;
(function (TransferDirection) {
    TransferDirection["FromServer"] = "FS";
    TransferDirection["FromServerToAll"] = "FS_ALL";
    TransferDirection["ToServer"] = "TS";
})(TransferDirection || (TransferDirection = {}));
/** Socket communication type
 * - Initial: All initial communications (e.g. Joining a lobby, Receiving snapshot by the player, Transfer token)
 * - Command: All commands (e.g. Start race, Reset lobby)
 * - Information: All information (e.g. Player joined, Sending leaderboard)
 */
var CommunicationType;
(function (CommunicationType) {
    CommunicationType["Initial"] = "INT";
    CommunicationType["Command"] = "CMD";
    CommunicationType["Information"] = "INF";
})(CommunicationType || (CommunicationType = {}));
var ProtocolName;
(function (ProtocolName) {
    ProtocolName["AuthToken"] = "AUTH_TOKEN";
    ProtocolName["JoinLobby"] = "JOIN_LOBBY";
    ProtocolName["PlayerJoin"] = "PLAYER_JOIN";
    ProtocolName["CreateLobby"] = "CREATE_LOBBY";
    ProtocolName["StartRace"] = "START_RACE";
    ProtocolName["SendTypeLog"] = "SEND_TYPE_LOG";
    ProtocolName["UpdateTypeLogs"] = "UPDATE_TYPE_LOGS";
    ProtocolName["Timeout"] = "TIMEOUT";
    // ForceEnd = 'FORCE_END',
    ProtocolName["SendLeaderboard"] = "SEND_LEADERBOARD";
    ProtocolName["ClearPlayer"] = "CLEAR_PLAYER";
    ProtocolName["ResetLobby"] = "RESET_LOBBY";
})(ProtocolName || (ProtocolName = {}));
var SocketProtocols;
(function (SocketProtocols) {
    // Auth
    SocketProtocols["AuthTokenTransfer"] = "FS/INT/AUTH_TOKEN";
    // Joining a lobby
    SocketProtocols["JoinLobbyRequest"] = "TS/INT/JOIN_LOBBY";
    SocketProtocols["JoinLobbyAccept"] = "FS/INT/JOIN_LOBBY";
    SocketProtocols["PlayerJoin"] = "FS_ALL/INF/PLAYER_JOIN";
    // Creating a lobby
    SocketProtocols["CreateLobbyRequest"] = "TS/INT/CREATE_LOBBY";
    SocketProtocols["CreateLobbyAccept"] = "FS/INT/CREATE_LOBBY";
    // Race start
    SocketProtocols["StartRaceRequest"] = "TS/CMD/START_RACE";
    SocketProtocols["StartRaceAccept"] = "FS/CMD/START_RACE";
    // Type logs
    SocketProtocols["SendTypeLog"] = "TS/INF/SEND_TYPE_LOG";
    SocketProtocols["UpdateTypeLogs"] = "FS_ALL/INF/UPDATE_TYPE_LOGS";
    // End race
    SocketProtocols["InformTimeout"] = "TS/INF/TIMEOUT";
    SocketProtocols["SendLeaderboard"] = "FS_ALL/INF/SEND_LEADERBOARD";
    // Clear a player
    SocketProtocols["ClearPlayer"] = "FS_ALL/CMD/CLEAR_PLAYER";
    // Reset lobby
    SocketProtocols["ResetLobby"] = "FS_ALL/CMD/RESET_LOBBY";
})(SocketProtocols || (exports.SocketProtocols = SocketProtocols = {}));
//# sourceMappingURL=protocols.js.map