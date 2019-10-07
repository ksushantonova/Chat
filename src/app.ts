import express from 'express';
import http from 'http';
import path from 'path';
import socketIo from 'socket.io';
import bodyParser from 'body-parser';
import uniqid from 'uniqid';
import { createConnection, Connection, getRepository } from 'typeorm';
import * as core from 'express-serve-static-core';
import Socket from './Socket';
import { UserController } from './UserController';
import { DialogController } from './DialogController';
import { MessageController } from './MessageController';

const database = createConnection();
const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const userController = new UserController(getRepository);
const messageController = new MessageController(getRepository);
const dialogController = new DialogController(getRepository);

export default class Server {
  app: core.Express;
  io: socketIo.Server;
  database: Promise<Connection>;

  constructor(app: core.Express, database: Promise<Connection>, io: socketIo.Server) {
    this.app = app;
    this.database = database;
    this.io = io;
  }

  init() {
    this.initDatabase();
    this.initSettings();
    this.initGetMethods();
    this.initPostMethods();
    this.initSocketConnection();
  }

  initDatabase() {
    database.then(() => {
      server.listen(process.env.PORT, () => {
        console.log(`listening on *:${process.env.PORT}`);
      });
    });
  }

  initSettings() {
    this.use(bodyParser.json());
    this.use(bodyParser.urlencoded({ extended: true }));
    this.use(express.static('public/register'));
    this.use(express.static('public/chat'));
  }

  initGetMethods() {
    this.get('/', (req: any, res: any) => {
      res.sendFile('register.html',  { root: path.join(__dirname, '../public/register') });
    });
    this.get('/chat', (req: any, res: any) => {
      res.sendFile('chat.html',  { root: path.join(__dirname, '../public/chat') });
    });
  }

  initPostMethods() {
    this.app.post('/chat', (req, res) => {
      const data = req.body;
      data.userId = uniqid();
      data.id = uniqid();
      userController.init(data);
      userController.addToTable(data);
    });
  }

  initSocketConnection() {
    this.io.on('connection', (socket) => {
      const userSocket = new Socket(socket, this.io);
      userController.connect(userSocket);
      this.handleMessages(userSocket);
    });
  }

  handleMessages(socket: Socket) {
    const dialogId = uniqid();
    socket.on('message', (data: string) => {
      const messageId = uniqid();
      messageController.connect(data, messageId, dialogId);
      dialogController.connect(messageId, dialogId);
      this.io.emit('message', data);
    });
  }

  use(handler: core.RequestHandler | jest.Mock<any, any> | core.Handler) {
    this.app.use(handler);
  }

  get(path: string, callback: core.RequestHandler | jest.Mock<any, any>) {
    this.app.get(path, callback);
  }
}

const appServer = new Server(app, database, io);
appServer.init();
