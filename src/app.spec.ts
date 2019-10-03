import Server from './app';

const app = {
  use: jest.fn(),
  get: jest.fn(),
  post: jest.fn(),
};

const database = {
  connection: jest.fn(() => {
    return new Promise((rej: any, res: any) => {
      res();
    });
  }),
};

const io = {
  on: jest.fn(),
};

class MockServer extends Server {
  constructor(app: any, database: any, io: any) {
    super(app, database, io);
  }
}

describe('userServer', () => {
  const server = new MockServer(app, database, io);
  it('use', () => {
    const fn = jest.fn();
    server.use(fn);

    expect(server.app.use).toHaveBeenCalled();
  });

  it('get', () => {
    const fn = jest.fn();
    server.get('path', fn);
    expect(server.app.get).toHaveBeenCalled();
  });
});
