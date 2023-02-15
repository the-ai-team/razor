import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
const app = express();
const port = process.env.PORT || 3000;
const server = http.createServer(app);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const allowedOrigin =
  process.env.NX_ALLOWED_ORIGINS.split(', ') || 'http://localhost:4200';

const io = new Server(server, {
  cors: {
    origin: allowedOrigin,
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

io.on('connection', socket => {
  console.log('a user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(port, () => {
  console.log(`App listening on port http://localhost:${port}`);
});
