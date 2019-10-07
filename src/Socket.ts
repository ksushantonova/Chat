export interface UserSocket {
  on: (event: string, callback: (data: any) => void) => void;
  emit: (event: string, data: any) => void;
}

export default class Socket {
  socket: UserSocket;

  constructor(socket: UserSocket) {
    this.socket = socket;
  }

  emit(name: string, tempUser: string) {
    this.socket.emit(name, tempUser);
  }

  on(topic: string, handler: any) {
    this.socket.on(topic, handler);
  }

  disconnectCallback() {
    console.log('user disconnected');
  }
}
