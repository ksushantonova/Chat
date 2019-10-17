import { getConnection } from 'typeorm';
import { MessageModel } from '../models/message.entity';
import { Message } from '../../entities/message';
import { MessageData } from '../../controllers/MessageController';

export class TypeOrmMessageRepository {
  public async add(message: MessageData): Promise<Message> {
    if (message.messageId) {
      await getConnection()
        .createQueryBuilder()
        .insert()
        .into(MessageModel)
        .values(message)
        .execute();
    }
    return;
  }
}
