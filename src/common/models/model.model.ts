import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export abstract class ModelQL {
  @Field(() => Int)
  id: number;

  created_at: Date;
  updated_at: Date;
}
