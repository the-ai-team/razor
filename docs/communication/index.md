# Communication protocol

### Establishing socket connection

- [Creating new tournament](./protocol/create-lobby.md)
- [Joining existing tournament](./protocol/join-lobby.md)

### After establishing connection

- [Starting Race (AKA Starting Countdown)](./protocol/start-race.md)
- [Sending Type Logs (Start, Ongoing, End)](./protocol/send-type-log.md)
  - Sending starting & ending type log
  - Sending type log while racing with an interval
  - Ending type log will consider as a `Player Race Complete`
- [Ending Race (By timeout or Force end)](./protocol/end-race.md)
- [Clearing(Removing) Player (Player disconnect)](./protocol/clear-player.md)
- [Reset Tournament (Leaderboard => Lobby)](./protocol/reset-lobby.md)
