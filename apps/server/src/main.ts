import { store } from '@razor/store';
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

import './controllers';

import { sendDataToClients } from './services';
import { socketManager } from './socket';
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

const allowedOrigin =
  process.env.NX_ALLOWED_ORIGINS?.split(', ') || 'http://localhost:4200';

const socketServer = new Server(server, {
  cors: {
    origin: allowedOrigin,
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

socketServer.on('connection', socket => socketManager(socket, socketServer));

server.listen(port, () => {
  console.log(`App listening on port http://localhost:${port}`);
});

sendDataToClients(socketServer);
