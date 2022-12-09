# Communication protocol

REST Calls

- [Creating new lobby](./rest/create-lobby.md)
- [Joining existing lobby](./rest/join-lobby.md)

Socket Messages

- [Starting Race (AKA Starting Countdown)](./sockets/start-race.md)
- [Sending Type Logs (Start, Ongoing, End)](./sockets/send-type-log.md)
  - Sending starting & ending type log
  - Sending type log while racing with an interval
  - Ending type log will consider as a `Player Race Complete`
- [Ending Race (By timeout or Force end)](./sockets/end-race.md)
- [Clearing(Removing) Player (Player disconnect)](./sockets/clear-player.md)
- [Ending Race (By timeout or Force end)](./sockets/end-race.md)
