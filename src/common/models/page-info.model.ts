import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PageInfoQL {
  @Field((type) => Int)
  currentPage: number;

  @Field((type) => Int)
  totalPages: number;

  hasNextPage: boolean;
}
