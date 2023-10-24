import { ClearPlayerData, InformTimeoutData, InitialClientData, InitialServerData, PlayerJoinData, SendLeaderboardData, SendTypeLogData, StartRaceAcceptData, StartRaceRequestData, UpdateTypeLogsData } from './protocol-data';
import { SocketProtocols } from './protocols';
export interface InitialProtocolToTypeMap extends Record<string, object> {
    [SocketProtocols.JoinLobbyRequest]: InitialClientData;
    [SocketProtocols.JoinLobbyAccept]: InitialServerData;
    [SocketProtocols.CreateLobbyRequest]: InitialClientData;
    [SocketProtocols.CreateLobbyAccept]: InitialServerData;
}
export interface OtherProtocolToTypeMap extends Record<string, object> {
    [SocketProtocols.PlayerJoin]: PlayerJoinData;
    [SocketProtocols.ClearPlayer]: ClearPlayerData;
    [SocketProtocols.StartRaceRequest]: StartRaceRequestData;
    [SocketProtocols.StartRaceAccept]: StartRaceAcceptData;
    [SocketProtocols.SendTypeLog]: SendTypeLogData;
    [SocketProtocols.UpdateTypeLogs]: UpdateTypeLogsData;
    [SocketProtocols.InformTimeout]: InformTimeoutData;
    [SocketProtocols.SendLeaderboard]: SendLeaderboardData;
}
export type AllProtocolToTypeMap = InitialProtocolToTypeMap & OtherProtocolToTypeMap;
