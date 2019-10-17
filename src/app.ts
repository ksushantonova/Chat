import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import { Socket } from './socket';
import { routes } from './routes';
import { UserSocket } from './sockets/user-socket-component';

const app = express();
const server = http.createServer(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public/chat'));
app.use('/', routes);

export const socket = new Socket(server);

socket.on('connection', (ioSocket: any) => {
  const userSocket = new UserSocket(ioSocket, socket);
  socket.subscribe(ioSocket, 'push_message', userSocket.pushMessage);
});

server.listen(process.env.PORT, () => {
  console.log(`listening on *:${process.env.PORT}`);
});
