import * as core from 'express-serve-static-core';
import { Connection, createConnection } from 'typeorm';
import socketIo from 'socket.io';
import http from 'http';
import bodyParser from 'body-parser';
import express from 'express';
import path from 'path';
import { UserController } from './UserController';
import { MessageController } from './MessageController';
import { DialogController } from './DialogController';
import uniqid from 'uniqid';
import Socket from './Socket';
import { app } from './app';

const database = createConnection();
const server = http.createServer(app);
const io = socketIo(server);


export default class Server {
  init(
    userController: UserController,
    messageController: MessageController,
    dialogController: DialogController) {
    this.initDatabase();
    this.initSettings();
    this.initGetMethods();
    this.initPostMethods(userController);
    this.initSocketConnection(userController, messageController, dialogController);
  }

  initSettings() {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(express.static('public/register'));
    app.use(express.static('public/chat'));
  }

  initGetMethods() {
    app.get('/', (req: any, res: any) => {
      res.sendFile('register.html',  { root: path.join(__dirname, '../public/register') });
    });
    app.get('/chat', (req: any, res: any) => {
      res.sendFile('chat.html',  { root: path.join(__dirname, '../public/chat') });
    });
  }

  initPostMethods(userController: UserController) {
    app.post('/chat', (req, res) => {
      const data = req.body;
      data.userId = uniqid();
      data.id = uniqid();
      userController.init(data);
      userController.saveUser(data);
    });
  }

  initSocketConnection(
    userController: UserController,
    messageController: MessageController,
    dialogController: DialogController) {
    io.on('connection', (socket) => {
      const userSocket = new Socket(socket);
      userController.initUserSocket(userSocket);
      this.handleMessages(userSocket, messageController, dialogController);
    });
  }

  handleMessages(
    socket: Socket, messageController: MessageController, dialogController: DialogController) {
    const dialogId = uniqid();
    socket.on('message', (data: string) => {
      const messageId = uniqid();
      messageController.saveMessage(data, messageId, dialogId);
      dialogController.saveDialog(messageId, dialogId);
      io.emit('message', data);
    });
  }

  initDatabase() {
    database.then(() => {
      server.listen(process.env.PORT, () => {
        console.log(`listening on *:${process.env.PORT}`);
      });
    });
  }
}
