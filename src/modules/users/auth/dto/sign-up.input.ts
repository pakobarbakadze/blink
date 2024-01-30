import { InputType } from '@nestjs/graphql';

@InputType()
export class SignUpUserInput {
  username: string;

  password: string;
}
