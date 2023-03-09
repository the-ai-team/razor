# Communication protocol

### Establishing socket connection

- [Creating new tournament](./protocol/create-tournament.md)
- [Joining existing tournament](./protocol/join-tournament.md)

### After establishing connection

- [Starting Race (AKA Starting Countdown)](./protocol/start-race.md)
- [Sending Type Logs (Start, Ongoing, End)](./protocol/send-type-log.md)
  - Sending starting & ending type log
  - Sending type log while racing with an interval
  - Ending type log will consider as a `Player Race Complete`
- [Ending Race (By timeout or Force end)](./protocol/end-race.md)
- [Clearing(Removing) Player (Player disconnect)](./protocol/clear-player.md)
- [Reset Tournament (Leaderboard => Lobby)](./protocol/reset-tournament.md)

# Protocol Keywords

### Transfer direction

- From Server to Client: `FS` _(From Server)_
- From Server to All Clients: `FS_ALL` _(From Server to All)_
- From Client to Server: `TS` _(To Server)_

### Communication type

- Initial/Establishment: `INT`
- Command: `CMD`
- Information: `INF`

### Protocol name

- Auth Token: `AUTH_TOKEN`
- Join Lobby: `JOIN_LOBBY`
- Player Join: `PLAYER_JOIN`
- Create Lobby: `CREATE_LOBBY`
- Start Race: `START_RACE`
- Send Type Log: `SEND_TYPE_LOG`
- Update Type Logs: `UPDATE_TYPE_LOGS`
- Timeout: `TIMEOUT`
- Force End: `FORCE_END`
- Send Leaderboard: `SEND_LEADERBOARD`
- Clear Player: `CLEAR_PLAYER`
- Reset Lobby: `RESET_LOBBY`

# Protocol format

- `[Transfer direction]/[Communication type]/[Protocol name]`
