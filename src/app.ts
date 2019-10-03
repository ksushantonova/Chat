import express from 'express';
import http, { IncomingMessage, ServerResponse, OutgoingMessage } from 'http';
import path from 'path';
import socketIo from 'socket.io';
import bodyParser from 'body-parser';
import uniqid from 'uniqid';
import { createConnection, getRepository } from 'typeorm';
import * as core from 'express-serve-static-core';
import Socket from './Socket';
import Database from './Database';
import { ChatController } from './ChatController';

const database = new Database(createConnection, getRepository);
const controller = new ChatController(database);
const app = express();
const server = http.createServer(app);
export const io = socketIo(server);

export default class Server {
  app: core.Express;
  database: Database;
  io: socketIo.Server;

  constructor(app: core.Express, database: Database, io: socketIo.Server) {
    this.app = app;
    this.database = database;
    this.io = io;
  }

  init() {
    database.init();
    database.connection.then(() => {
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
      data.userid = uniqid();
      controller.init(data);
      database.createNewUser(data);
    });

    io.on('connection', (socket) => {
      controller.connect(socket, io, Socket);
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
