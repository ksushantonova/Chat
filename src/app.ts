import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import path from 'path';
import uniqid from 'uniqid';
import socketIo from 'socket.io';
import { UserController } from './controllers/UserController';
import { DialogController } from './controllers/DialogController';
import { MessageController } from './controllers/MessageController';
import Server from './Server';
import Socket from './Socket';

export const app = express();
const userController = new UserController();
const messageController = new MessageController();
const dialogController = new DialogController();
const mainServer = new Server(userController, messageController, dialogController);
export const router = express.Router();
export const server = http.createServer(app);
const io = socketIo(server);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public/register'));
app.use(express.static('public/chat'));
app.use('/', router);

router.get('/', (req, res) => {
  res.sendFile('register.html',  { root: path.join(__dirname, '../public/register') });
});

router.get('/chat', (req, res) => {
  res.sendFile('chat.html',  { root: path.join(__dirname, '../public/chat') });
});

router.post('/chat', (req, res) => {
  mainServer.initPostMethod(req.body);
});

io.on('connection', (socket) => {
  const userSocket = new Socket(socket);
  mainServer.initSocketConnection(userSocket);

  userSocket.on('message', (data: string) => {
    const messageId = uniqid();
    mainServer.handleMesage(data, messageId);
    mainServer.handleDialogMessage(messageId);
    io.emit('message', data);
  });
});
