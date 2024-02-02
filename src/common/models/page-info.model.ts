import { Field, Int, ObjectType } from '@nestjs/graphql';
import { PageInfo } from '../types/interface/page-info.interface';

@ObjectType()
export class PageInfoType implements PageInfo {
  @Field((type) => Int)
  currentPage: number;

  @Field((type) => Int)
  totalPages: number;

  hasNextPage: boolean;
}
