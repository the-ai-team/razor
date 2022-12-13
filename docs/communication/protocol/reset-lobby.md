[<- Back](../index.md)

# Reset Lobby (Timeout after leaderboard)

```mermaid
sequenceDiagram
    autonumber
    participant S as Server
    participant V as Viewer

    Note over S: After leaderboard timeout
    S-->>S: Change tournament state

    S->>V: Socket Command [Sock01]
```

---

## Sock01 (Reset lobby) | From server (To all) | Command

```json
"type": "FS_ALL/CMD/RESET_LOBBY"
"data": {}
```

references: [Data Models](../../../../libs/models/src/lib/sockets)
