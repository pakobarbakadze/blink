import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class TokensQl {
  @Field()
  access_token: string;

  @Field()
  refresh_token: string;
}
