/** Socket communication direction */
enum TransferDirection {
  FromServer = 'FS',
  FromServerToAll = 'FS_ALL',
  ToServer = 'TS',
}

/** Socket communication type
 * - Initial: All initial communications (e.g. Joining a lobby, Receiving snapshot by the player, Transfer token)
 * - Command: All commands (e.g. Start race, Reset lobby)
 * - Information: All information (e.g. Player joined, Sending leaderboard)
 */
enum CommunicationType {
  Initial = 'INT',
  Command = 'CMD',
  Information = 'INF',
}

enum ProtocolName {
  AuthToken = 'AUTH_TOKEN',
  JoinLobby = 'JOIN_LOBBY',
  PlayerJoin = 'PLAYER_JOIN',
  CreateLobby = 'CREATE_LOBBY',
  StartRace = 'START_RACE',
  SendTypeLog = 'SEND_TYPE_LOG',
  UpdateTypeLogs = 'UPDATE_TYPE_LOGS',
  Timeout = 'TIMEOUT',
  ForceEnd = 'FORCE_END',
  SendLeaderboard = 'SEND_LEADERBOARD',
  ClearPlayer = 'CLEAR_PLAYER',
  ResetLobby = 'RESET_LOBBY',
}

export const PROTO_AUTH_TOKEN_TRANSFER = `${TransferDirection.FromServer}/${CommunicationType.Initial}/${ProtocolName.AuthToken}`;

// Joining a lobby
export const PROTO_JOIN_LOBBY_REQUEST = `${TransferDirection.ToServer}/${CommunicationType.Initial}/${ProtocolName.JoinLobby}`;
export const PROTO_JOIN_LOBBY_ACCEPT = `${TransferDirection.FromServer}/${CommunicationType.Initial}/${ProtocolName.JoinLobby}`;
export const PROTO_PLAYER_JOINED = `${TransferDirection.FromServerToAll}/${CommunicationType.Information}/${ProtocolName.PlayerJoin}`;

// Creating a lobby
export const PROTO_CREATE_LOBBY_REQUEST = `${TransferDirection.ToServer}/${CommunicationType.Initial}/${ProtocolName.CreateLobby}`;
export const PROTO_CREATE_LOBBY_ACCEPT = `${TransferDirection.FromServer}/${CommunicationType.Initial}/${ProtocolName.CreateLobby}`;

// Race start
export const PROTO_START_RACE_REQUEST = `${TransferDirection.ToServer}/${CommunicationType.Command}/${ProtocolName.StartRace}`;
export const PROTO_START_RACE_ACCEPT = `${TransferDirection.FromServer}/${CommunicationType.Command}/${ProtocolName.StartRace}`;

// Type logs
export const PROTO_SEND_TYPE_LOG = `${TransferDirection.ToServer}/${CommunicationType.Information}/${ProtocolName.SendTypeLog}`;
export const PROTO_UPDATE_TYPE_LOGS = `${TransferDirection.FromServerToAll}/${CommunicationType.Information}/${ProtocolName.UpdateTypeLogs}`;

// End race
export const PROTO_INFORM_TIMEOUT = `${TransferDirection.ToServer}/${CommunicationType.Information}/${ProtocolName.Timeout}`;
export const PROTO_FORCE_END = `${TransferDirection.FromServer}/${CommunicationType.Command}/${ProtocolName.ForceEnd}`;
export const PROTO_SEND_LEADERBOARD = `${TransferDirection.FromServerToAll}/${CommunicationType.Information}/${ProtocolName.SendLeaderboard}`;

// Clear a player
export const PROTO_CLEAR_PLAYER = `${TransferDirection.FromServerToAll}/${CommunicationType.Command}/${ProtocolName.ClearPlayer}`;

// Reset lobby
export const PROTO_RESET_LOBBY = `${TransferDirection.FromServerToAll}/${CommunicationType.Command}/${ProtocolName.ResetLobby}`;
