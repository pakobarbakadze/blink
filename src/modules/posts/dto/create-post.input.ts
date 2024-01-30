import { InputType } from '@nestjs/graphql';

@InputType()
export class CreatePostInput {
  title: string;

  content: string;
}
