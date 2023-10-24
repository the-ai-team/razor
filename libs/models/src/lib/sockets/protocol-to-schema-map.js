"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.protocolToSchemaMap = void 0;
const protocol_schemas_1 = require("./protocol-schemas");
const protocols_1 = require("./protocols");
// This map contains schemas for each protocols defined in {@link SocketProtocols}
exports.protocolToSchemaMap = new Map([
    [protocols_1.SocketProtocols.AuthTokenTransfer, protocol_schemas_1.authTokenTransferSchema],
    [protocols_1.SocketProtocols.JoinLobbyRequest, protocol_schemas_1.initialClientDataSchema],
    [protocols_1.SocketProtocols.JoinLobbyAccept, protocol_schemas_1.initialServerDataSchema],
    [protocols_1.SocketProtocols.CreateLobbyRequest, protocol_schemas_1.initialClientDataSchema],
    [protocols_1.SocketProtocols.CreateLobbyAccept, protocol_schemas_1.initialServerDataSchema],
    [protocols_1.SocketProtocols.PlayerJoin, protocol_schemas_1.playerJoinSchema],
    [protocols_1.SocketProtocols.ClearPlayer, protocol_schemas_1.clearPlayerSchema],
    [protocols_1.SocketProtocols.StartRaceRequest, protocol_schemas_1.startRaceRequestSchema],
    [protocols_1.SocketProtocols.StartRaceAccept, protocol_schemas_1.startRaceAcceptSchema],
    [protocols_1.SocketProtocols.SendTypeLog, protocol_schemas_1.sendTypeLogSchema],
    [protocols_1.SocketProtocols.UpdateTypeLogs, protocol_schemas_1.updateTypeLogsSchema],
    [protocols_1.SocketProtocols.InformTimeout, protocol_schemas_1.informTimeoutSchema],
    [protocols_1.SocketProtocols.SendLeaderboard, protocol_schemas_1.sendLeaderboardSchema],
]);
//# sourceMappingURL=protocol-to-schema-map.js.map