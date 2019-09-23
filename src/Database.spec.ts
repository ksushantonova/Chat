import Database from './Database';

export const createConnection = jest.fn((data) => {
  return 'done';
});

export const getRepository = jest.fn(() => {
  return {
    create: jest.fn(),
    save: jest.fn(),
  };
});

export default class MockDatabase extends Database {
  constructor(createConnection: any, getRepository: any) {
    super(createConnection, getRepository);
  }
}

describe('Database', () => {

  const database = new MockDatabase(createConnection, getRepository);

  it('have been inited', () => {
    database.init();
    expect(database.createConnection).toHaveBeenCalled();
    expect(database.connection).toBeTruthy();
  });

  it('created User', async () => {
    const data = {
      name: 'ksu',
      email: 'string',
      pass: 'string',
      userid: 'id',
    };
    await database.createNewUser(data);
    expect(database.userRepo.create).toHaveBeenCalled();
    expect(database.userRepo.save).toHaveBeenCalled();
  });

  it('save message to database', async () => {
    const message = {
      message: 'message',
      username: 'username',
      userid: 'id',
    };

    await database.writeMessageToDatabase(message, 'dialogid');
    expect(database.userRepo.create).toHaveBeenCalledTimes(1);
    expect(database.userRepo.save).toHaveBeenCalledTimes(1);
  })
;
});
