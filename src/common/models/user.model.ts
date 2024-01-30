import { ObjectType } from '@nestjs/graphql';
import { ModelQL } from './model.model';

@ObjectType()
export class UserQL extends ModelQL {
  username: string;
}
