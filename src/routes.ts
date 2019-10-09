import express from 'express';
import path from 'path';

export const routes = express.Router();

routes.get('/', (req, res) => {
  res.sendFile('register.html',  { root: path.join(__dirname, '../public/register') });
});

routes.get('/chat', (req, res) => {
  res.sendFile('chat.html',  { root: path.join(__dirname, '../public/chat') });
});

routes.post('/chat', (req, res) => {});
