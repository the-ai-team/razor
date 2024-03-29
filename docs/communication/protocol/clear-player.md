[<- Back](../index.md)

# Clearing(Removing) Player (Player disconnect)

```mermaid
sequenceDiagram
    autonumber
    participant C as Client
    participant S as Server
    participant V as Viewer

    C->>S: Socket disconnect

    Note over S: Wait for reconnecting

    S-->>S: Remove player
    S->>V: Socket Command [Sock01]
```

---

## Sock01 (Clear player) | From server (To all) | Command

```json
"type": "FS_ALL/CMD/PLAYER_CLEAR",
"data": {
    "playerId": PLAYER_ID
}
```

references: [Data Models](../../../../libs/models/src/lib/sockets)
