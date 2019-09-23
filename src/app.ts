import express from 'express';
import http from 'http';
import path from 'path';
import socketIo from 'socket.io';
import bodyParser from 'body-parser';
import uniqid from 'uniqid';
import { createConnection, getRepository } from 'typeorm';
// tslint:disable-next-line: import-name
import Database from './Database';
import { ChatController } from './ChatController';

const database = new Database(createConnection, getRepository);
const controller = new ChatController(database);
const app = express();
import Socket from './Socket';
const server = http.createServer(app);
export const io = socketIo(server);

export default class Server {
  app: any;
  database: any;
  io: any;

  constructor(app: any, database: any, io: any) {
    this.app = app;
    this.database = database;
    this.io = io;
  }
  init() {
    database.init();
    database.connection.then(() => {
      console.log('ccc');
      server.listen(process.env.PORT, () => {
        console.log(`listening on *:${process.env.PORT}`);
      });
    });

    this.use(bodyParser.json());
    this.use(bodyParser.urlencoded({ extended: true }));
    this.use(express.static('public'));

    this.get('/', (req: any, res: any) => {
      res.sendFile('register.html',  { root: path.join(__dirname, '../public') });
    });

    this.get('/chat', (req: any, res: any) => {
      res.sendFile('chat.html',  { root: path.join(__dirname, '../public') });
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

  use(handler: any) {
    this.app.use(handler);
  }

  get(path: string, callback: any) {
    this.app.get(path, callback);
  }

  post(path: string, callback: any) {
    
  }


}

const appServer = new Server(app, database, io);
appServer.init();
