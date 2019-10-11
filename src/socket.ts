import socketIo from 'socket.io';

export class Socket {
  constructor(server: any) {
    this.io = socketIo(server);
  }

  private io: any;

  on(what: string, callback: any) {
    this.io.on(what, callback);
  }

  subscribe(ioSocket: any, channel: string, callback: any) {
    ioSocket.on(channel, (...args: any[]) => {
      callback(this.io, ...args);
    });
  }

  getIO() {
    return this.io;
  }
}
