import { ArgsType, Field, Int, registerEnumType } from '@nestjs/graphql';
import { SORT } from '../types/enums/sort.enum';

registerEnumType(SORT, {
  name: 'Sort',
});

@ArgsType()
export class GetResourceArgs {
  sort?: SORT;
  search?: string;

  @Field(() => Int, { defaultValue: 1 })
  page: number;

  @Field(() => Int, { defaultValue: 10 })
  perPage: number;
}
