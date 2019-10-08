import express from 'express';
import { UserController } from './UserController';
import { DialogController } from './DialogController';
import { MessageController } from './MessageController';
import Server from './Server';

export const app = express();
const userController = new UserController();
const messageController = new MessageController();
const dialogController = new DialogController();
const mainServer = new Server();

mainServer.init(userController, messageController, dialogController);
