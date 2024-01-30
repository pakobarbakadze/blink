import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class TokensQl {
  access_token: string;

  refresh_token: string;
}
