import Socket from './Socket';

const database = {
  writeMessageToDatabase: jest.fn(),
};

export const mockIo = {
  emit: jest.fn(),
};

export const mockSocket = {
  emit: jest.fn(),
  on: jest.fn((data) => {
  }),
  disconnect: jest.fn(),
};

export class MockSocket extends Socket {
  constructor(socket: any, io: any, database: any) {
    super(socket, io, database);
  }
}

describe('Socket', () => {
  const socket = new MockSocket(mockSocket, mockIo, database);
  it('emits', () => {
    socket.emit('topic');
    expect(mockSocket.emit).toHaveBeenCalled();
  });

  it('on Message', () => {
    socket.onMessage('dialogid', database);
    expect(socket.dialogid).toBe('dialogid');
    expect(socket.socket.on).toHaveBeenCalled();
  });

  it('catched Message', () => {
    const message = {
      message: 'aaa',
      username: 'ksu',
      userid: 'id',
    };
    socket.handler(JSON.stringify(message));
    expect(socket.io.emit).toHaveBeenCalled();
    expect(socket.database.writeMessageToDatabase).toHaveBeenCalled();
  });

  it('disconnect', () => {
    socket.disconnect();
    socket.callback();
    expect(socket.socket.on).toHaveBeenCalled();
  });
});