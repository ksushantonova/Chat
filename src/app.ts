import express from 'express';
import http from 'http';
import path from 'path';
import socketIo from 'socket.io';
import bodyParser from 'body-parser';
import uniqid from 'uniqid';
import { Database } from './Database';
import { ChatController } from './ChatController';

const database = new Database();
const controller = new ChatController();
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

database.init();
database.connection.then(() => {
  server.listen(process.env.PORT, () => {
    console.log(`listening on *:${process.env.PORT}`);
  });
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile('register.html',  { root: path.join(__dirname, '../public') });
});

app.get('/chat', (req, res) => {
  res.sendFile('chat.html',  { root: path.join(__dirname, '../public') });
});

app.post('/chat', (req, res) => {
  const data = req.body;
  data.userid = uniqid();
  controller.init(data, database);
  database.createNewUser(data);
});

io.on('connection', (socket) => {
  controller.connect(socket, io);
});
