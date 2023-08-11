```mermaid
sequenceDiagram
    autonumber
    box rgb(200, 0, 40, 0.5) Top Layer
    participant main
    participant socket
    end

    box rgb(40, 40, 200, 0.5)
    participant Controllers
    end

    box rgb(0, 200, 200, 0.5)
    participant PubSub
    end

    box rgb(100, 200, 20, 0.5) Main Utils
    participant send-data-to-clients
    participant check-reconnected
    participant publish-on-receive
    end

    main->>socket: manageSocketConnections(socket, socketServer)
    main->>send-data-to-clients: emitSocketMessages(socketServer)

    socket->>publish-on-receive: onAny => publishOnReceive(event, data)
    socket->>check-reconnected: onAny => checkReconnected(authToken, socketServer)

    publish-on-receive--)+PubSub: publish(event, data)
    PubSub--)Controllers: subscribe(event)
    Controllers--)PubSub: publish(sendDataToClients, data)
    PubSub--)-send-data-to-clients: subscribe(event)
```

# main.ts

- Initialize server
- Initialize socket sever

### mangeSocketConnections()

- On client connect, passing socket and socket server to manage socket connections.  
  `onSocketConnection => manageSocketConnections(socket, socketServer)`

### emitSocketMessages()

- Passing socket server, which use to emit messages to client when needed.  
  `emitSocketMessages(socketServer)`

# socket.ts

- Manage socket connections.
- Authenticate player using `tokenPlayerMap`
- Emit tokens to new players

### publishOnReceive()

- Send all events and data, to do necessary processes and publish.  
  `onAnySocketEvent => publishOnReceive(event, data)`

### checkReconnected()

- When a player disconnected, check whether use is reconnected after a time period.
  `onSocketDisconnection => checkReconnected(authToken, socketServer)`

# send-data-to-clients.ts

- Listening to pubsub events
- Emit data to all clients in a socket room or to a single client when pubsub triggered.

# publish-on-receive.ts

- Run schema validation base on event
- Verify user belongs to the tournament
- Publish data to pubsub

# check-reconnected.ts

- Check user reconnected after a waiting time.
- If user not reconnected, delete player `tokenPlayerMap` and the game.
