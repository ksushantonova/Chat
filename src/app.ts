import express from 'express';
import http from 'http';
import path from 'path';
import socketIo from 'socket.io';
import bodyParser from 'body-parser';
import uniqid from 'uniqid';
import { createConnection, Connection, getRepository  } from 'typeorm';
import * as core from 'express-serve-static-core';
import Socket from './Socket';
import { ChatController } from './ChatController';

const database = createConnection();
const app = express();
const server = http.createServer(app);
export const controller = new ChatController(database, getRepository);
export const io = socketIo(server);

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
    database.then(() => {
      server.listen(process.env.PORT, () => {
        console.log(`listening on *:${process.env.PORT}`);
      });
    });

    this.use(bodyParser.json());
    this.use(bodyParser.urlencoded({ extended: true }));
    this.use(express.static('public/register'));
    this.use(express.static('public/chat'));
    this.get('/', (req: any, res: any) => {
      res.sendFile('register.html',  { root: path.join(__dirname, '../public/register') });
    });
    this.get('/chat', (req: any, res: any) => {
      res.sendFile('chat.html',  { root: path.join(__dirname, '../public/chat') });
    });

    app.post('/chat', (req, res) => {
      const data = req.body;
      data.userId = uniqid();
      data.id = uniqid();
      controller.init(data);
      controller.addToTable(data, 'user');
    });

    io.on('connection', (socket) => {
      const userSocket = new Socket(socket, this.io);
      controller.connect(userSocket);
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
