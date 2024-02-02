import { ObjectType } from '@nestjs/graphql';
import { ModelType } from './model.model';

@ObjectType()
export class UserType extends ModelType {
  username: string;
}
