import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PostQL {
  title: string;
  content: string;
  // author: User;
}
