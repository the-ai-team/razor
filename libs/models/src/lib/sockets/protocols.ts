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

export enum socketProtocols {
  // Auth
  AuthTokenTransfer = `${TransferDirection.FromServer}/${CommunicationType.Initial}/${ProtocolName.AuthToken}`,

  // Joining a lobby
  JoinLobbyRequest = `${TransferDirection.ToServer}/${CommunicationType.Initial}/${ProtocolName.JoinLobby}`,
  JoinLobbyAccept = `${TransferDirection.FromServer}/${CommunicationType.Initial}/${ProtocolName.JoinLobby}`,
  PlayerJoin = `${TransferDirection.FromServerToAll}/${CommunicationType.Information}/${ProtocolName.PlayerJoin}`,

  // Creating a lobby
  CreateLobbyRequest = `${TransferDirection.ToServer}/${CommunicationType.Initial}/${ProtocolName.CreateLobby}`,
  CreateLobbyAccept = `${TransferDirection.FromServer}/${CommunicationType.Initial}/${ProtocolName.CreateLobby}`,

  // Race start
  StartRaceRequest = `${TransferDirection.ToServer}/${CommunicationType.Command}/${ProtocolName.StartRace}`,
  StartRaceAccept = `${TransferDirection.FromServer}/${CommunicationType.Command}/${ProtocolName.StartRace}`,

  // Type logs
  SendTypeLog = `${TransferDirection.ToServer}/${CommunicationType.Information}/${ProtocolName.SendTypeLog}`,
  UpdateTypeLogs = `${TransferDirection.FromServerToAll}/${CommunicationType.Information}/${ProtocolName.UpdateTypeLogs}`,

  // End race
  InformTimeout = `${TransferDirection.ToServer}/${CommunicationType.Information}/${ProtocolName.Timeout}`,
  ForceEnd = `${TransferDirection.FromServer}/${CommunicationType.Command}/${ProtocolName.ForceEnd}`,
  SendLeaderboard = `${TransferDirection.FromServerToAll}/${CommunicationType.Information}/${ProtocolName.SendLeaderboard}`,

  // Clear a player
  ClearPlayer = `${TransferDirection.FromServerToAll}/${CommunicationType.Command}/${ProtocolName.ClearPlayer}`,

  // Reset lobby
  ResetLobby = `${TransferDirection.FromServerToAll}/${CommunicationType.Command}/${ProtocolName.ResetLobby}`,
}

export type SocketProtocolsTypes =
  (typeof socketProtocols)[keyof typeof socketProtocols];
