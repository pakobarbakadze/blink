import { InputType } from '@nestjs/graphql';

@InputType()
export class MessageInput {
  content: string;
}
