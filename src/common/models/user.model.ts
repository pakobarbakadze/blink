import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserQL {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  id: number;

  username: string;
}
