import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class SignInUserInput {
  @Field()
  username: string;

  @Field()
  password: string;
}
