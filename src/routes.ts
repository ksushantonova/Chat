import express from 'express';
import path from 'path';
import { mainServer } from './sockets/user-socket-component';
import { Auth } from './auth';

export const routes = express.Router();

routes.get('/', (req, res) => {
  res.sendFile('index.html', { root: path.join(__dirname, '../public/chat') });
});

routes.post('/', (req, res) => {
  const auth = new Auth();
  if (req.body.requestName === 'auth_step_0') {
    (async () => {
      const salt = await mainServer.getSalt(req.body);
      res.send(salt);
    })();
  } else if (req.body.requestName === 'auth_step_1') {
    mainServer.handleUser(req.body);
  } else if (req.body.requestName === 'auth_step_2') {
    auth.authUser(res, mainServer.incomeData);
  } else if (req.body.requestName === 'auth_step_3') {
    auth.aunthUserStepTwo(req.body, res);
  }
});
