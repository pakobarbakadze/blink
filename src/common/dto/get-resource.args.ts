import { ArgsType, registerEnumType } from '@nestjs/graphql';
import { SORT } from '../types/enums/sort.enum';

registerEnumType(SORT, {
  name: 'Sort',
});

@ArgsType()
export class GetResourceArgs {
  sort?: SORT;
  search?: string;
}
