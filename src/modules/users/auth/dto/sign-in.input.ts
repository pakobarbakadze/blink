import { InputType } from '@nestjs/graphql';

@InputType()
export class SignInUserInput {
  username: string;
  password: string;
  deviceId: string;
}
