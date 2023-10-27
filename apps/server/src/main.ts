import { store } from '@razor/store';
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

import './controllers';

import { viewAllCheckRaceEndInstances } from './utils/check-race-complete';
import { emitSocketMessages } from './services';
import { manageSocketConnections } from './socket';
import { tokenPlayerMap } from './stores';

const app = express();
const port = process.env.PORT || 3000;
const server = http.createServer(app);

app.get('/', (req, res) => {
  const storeState = store.getState();
  res.send(storeState);
});

app.get('/token-player-map', (req, res) => {
  const data = tokenPlayerMap.viewMap();
  res.send(data);
});

app.get('/ongoing-race-data', (req, res) => {
  const data = viewAllCheckRaceEndInstances();
  res.send(data);
});

const allowedOrigin = process.env.NX_ALLOWED_ORIGINS?.includes(',')
  ? process.env.NX_ALLOWED_ORIGINS?.split(', ')
  : process.env.NX_ALLOWED_ORIGINS || 'http://localhost:4200';

const socketServer = new Server(server, {
  cors: {
    origin: allowedOrigin,
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

socketServer.on('connection', socket =>
  manageSocketConnections(socket, socketServer),
);

server.listen(port, () => {
  console.log(`App listening on port http://localhost:${port}`);
});

emitSocketMessages(socketServer);
