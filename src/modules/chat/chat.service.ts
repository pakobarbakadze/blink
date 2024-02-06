import { Injectable } from '@nestjs/common';
import { User } from '../users/entities/user.entity';
import { MessageInput } from './dto/message.input';
import { Message } from './entities/message.entity';
import { MessageRepository } from './message.repository';

@Injectable()
export class ChatService {
  constructor(private readonly messageRepository: MessageRepository) {}

  public async saveMessage(
    messageInput: MessageInput,
    sender: User,
  ): Promise<Message> {
    const { content } = messageInput;

    const message = this.messageRepository.create({ content, sender });

    return this.messageRepository.save(message);
  }

  public findAll(): Promise<Message[]> {
    return this.messageRepository.findAll();
  }
}
