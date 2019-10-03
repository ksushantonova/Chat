import { ChatController } from './ChatController';
import MockDatabase from './Database.spec';
import { MockSocket, mockSocket, mockIo } from './Socket.spec';

class MockChatController extends ChatController {
  constructor(database: any) {
    super(database);
  }
}

describe('Controller', () => {
  const controller = new MockChatController(MockDatabase);
  it('haveBeenInited', () => {
    controller.init('data');
    expect(controller.tempUser).toBe('data');
  });

  it('connected', () => {
    controller.connect(mockSocket, mockIo, MockSocket);

    expect(mockSocket.emit).toHaveBeenCalled();
    expect(mockSocket.on).toHaveBeenCalled();
  });
});
