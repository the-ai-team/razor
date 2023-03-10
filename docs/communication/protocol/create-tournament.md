[<- Back](../index.md)

# Player Creating Tournament

```mermaid
sequenceDiagram
    autonumber
    participant C as Client
    participant S as Server
    participant M as Memory

    C->>S: Socket Initial [Sock01]
    S->>C: Auth Token Transfer [Sock02]

    rect rgba(191, 223, 255, 0.5)
        S-->>S: Validate Player name
        S-->>S: Create player
        S-->>S: Create tournament
    end

    S-->>M: Store Client [Data01]
    S-->>M: Store Room [Data02]
    S->>C: Socket Initial [Sock03]

```

---

## Sock01 (Player sends username without tournament id) | HTTP Upgrade | Initial

```mermaid
sequenceDiagram
    autonumber
    participant C as Client
    participant S as Server

    C->>S: HTTP Upgrade

    Note over S: Web Socket Establishment

    S->>C: Response
    C->>S: First socket message
```

HTTP --> WS

```json
"method": "GET",
"upgrade": "websocket",
"path": "/",
"headers":{
    "auth": AUTH_TOKEN, // if user has token before. Otherwise, no headers.
}
```

_Auth token will be only available if the user has logged in before and disconnected from the server but not closed or refreshed the browser!_

Socket message

```json
"type": "TS/INT/CREATE_LOBBY",
"data": {
    "playerName": "name",
    "tournamentId": "" // empty string
}
```

## Sock02 (Server sends auth token) | Socket Upgrade | Response

```json
"type": "FS/INT/AUTH_TOKEN",
"data": {
    "authToken": AUTH_TOKEN
}
```

## Data01 (Record with auth token, socket id & player id)

```json
"type": "STORE/CLIENT",
"data": {
    "authToken": AUTH_TOKEN,
    "socketId": SOCKET_ID,
    "playerId": PLAYER_ID
}
```

## Data02 (Record with socket room id & tournament id)

```json
"type": "STORE/ROOM",
"data": {
    "room": SOCKET_ROOM_ID,
    "tournamentId": TOURNAMENT_ID
}
```

## Sock03 (Response with a snapshot of the state) | From Server | Initial

```json
"type": "FS/INT/CREATE_LOBBY",
"data": {
    "playerId": PLAYER_ID,
    "tournamentId": TOURNAMENT_ID,
    "snapshot": {} // Empty Snapshot
}
```

references: [Data Models](../../../../libs/models/src/lib/sockets)

~ Further consider ~  
When a player joins if the player sends a token, the server will check whether the token is valid or not.  
If the token is valid, the server will use the token to retrieve the player id and other details.
If the token is invalid, the server will create a new player id and send it back to the client.
