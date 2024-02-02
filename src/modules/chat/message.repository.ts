import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { Message } from './entities/message.entity';

@Injectable()
export class MessageRepository {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
  ) {}

  public create(message: Partial<Message>): Message {
    return this.messageRepository.create(message);
  }

  public save(message: Message): Promise<Message> {
    return this.messageRepository.save(message);
  }

  public findAll(conditions?: FindManyOptions<Message>): Promise<Message[]> {
    return this.messageRepository.find(conditions);
  }
}
