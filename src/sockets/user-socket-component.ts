import { SocketComponent } from './socket-component';

export class UserSocket extends SocketComponent {
  constructor(ioSocket: any, io: any) {
    super();
    this.ioSocket = ioSocket;
    this.io = io;
  }

  io: any;
  ioSocket: any;

  init() {
    this.ioSocket.on('message', (data: string) => {
      this.io.emit('message', data);
    });
  }
}
