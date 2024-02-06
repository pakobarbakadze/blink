import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class RefreshTokenOutput {
  @Field()
  access_token: string;
}
