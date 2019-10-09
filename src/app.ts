import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import uniqid from 'uniqid';

import { UserController } from './controllers/UserController';
import { DialogController } from './controllers/DialogController';
import { MessageController } from './controllers/MessageController';
import { routes } from './routes';
import { UserSocket } from './sockets/user-socket-component';
import Server from './Server';
import { Socket } from './socket';

const app = express();
const userController = new UserController();
const messageController = new MessageController();
const dialogController = new DialogController();
// const mainServer = new Server(userController, messageController, dialogController);
const server = http.createServer(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public/register'));
app.use(express.static('public/chat'));

app.use('/', routes);

const socket = new Socket(server);

socket.on('connection', (ioSocket: any) => {
  socket.subscribe(ioSocket, 'push_message', (io: any, data: string) => {
    io.emit('push_message', data);
  });
});

server.listen(process.env.PORT, () => {
  console.log(`listening on *:${process.env.PORT}`);
});
