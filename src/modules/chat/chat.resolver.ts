import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { CurrentUser } from '../users/auth/decorators/current-user.decorator';
import { JwtAuthGuard } from '../users/auth/guards/jwt-auth.guard';
import { User } from '../users/user/entities/user.entity';
import { ChatService } from './chat.service';
import { MessageInput } from './dto/message.input';
import { MessageType } from './models/message.model';

@Resolver(() => MessageType)
export class ChatResolver {
  private readonly pubSub: PubSub;
  constructor(private readonly chatService: ChatService) {
    this.pubSub = new PubSub();
  }

  @Query(() => [MessageType], { name: 'messages' })
  findAll() {
    return this.chatService.findAll();
  }

  @Mutation(() => MessageType)
  @UseGuards(JwtAuthGuard)
  async sendMessage(
    @Args('message') message: MessageInput,
    @CurrentUser() user: User,
  ) {
    const newMessage = await this.chatService.saveMessage(message, user);
    this.pubSub.publish('messageSent', { messageSent: newMessage });
    return newMessage;
  }

  @Subscription(() => MessageType, { name: 'messageSent' })
  messageSent() {
    return this.pubSub.asyncIterator('messageSent');
  }
}
