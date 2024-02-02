import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatResolver } from './chat.resolver';
import { ChatService } from './chat.service';
import { Message } from './entities/message.entity';
import { MessageRepository } from './message.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Message])],
  providers: [ChatResolver, ChatService, MessageRepository],
})
export class ChatModule {}
