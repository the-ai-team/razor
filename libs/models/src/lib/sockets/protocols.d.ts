export declare enum SocketProtocols {
    AuthTokenTransfer = "FS/INT/AUTH_TOKEN",
    JoinLobbyRequest = "TS/INT/JOIN_LOBBY",
    JoinLobbyAccept = "FS/INT/JOIN_LOBBY",
    PlayerJoin = "FS_ALL/INF/PLAYER_JOIN",
    CreateLobbyRequest = "TS/INT/CREATE_LOBBY",
    CreateLobbyAccept = "FS/INT/CREATE_LOBBY",
    StartRaceRequest = "TS/CMD/START_RACE",
    StartRaceAccept = "FS/CMD/START_RACE",
    SendTypeLog = "TS/INF/SEND_TYPE_LOG",
    UpdateTypeLogs = "FS_ALL/INF/UPDATE_TYPE_LOGS",
    InformTimeout = "TS/INF/TIMEOUT",
    SendLeaderboard = "FS_ALL/INF/SEND_LEADERBOARD",
    ClearPlayer = "FS_ALL/CMD/CLEAR_PLAYER",
    ResetLobby = "FS_ALL/CMD/RESET_LOBBY"
}
export type SocketProtocolsTypes = (typeof SocketProtocols)[keyof typeof SocketProtocols];
