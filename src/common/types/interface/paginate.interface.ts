import { Type } from '@nestjs/common';
import { Field, ObjectType } from '@nestjs/graphql';
import { PageInfoType } from 'src/common/models/page-info.model';
import { PageInfo } from './page-info.interface';

export interface Paginated<T> {
  data: T[];
  pageInfo?: PageInfo;
}

export function Paginated<T>(classRef: Type<T>): Type<Paginated<T>> {
  @ObjectType({ isAbstract: true })
  abstract class PaginatedType<T> implements Paginated<T> {
    @Field((type) => [classRef], { nullable: true })
    data: T[];

    @Field((type) => PageInfoType, { nullable: true })
    pageInfo: PageInfoType;
  }

  return PaginatedType as Type<Paginated<T>>;
}
