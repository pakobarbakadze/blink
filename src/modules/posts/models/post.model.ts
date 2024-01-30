import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PostQL {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
