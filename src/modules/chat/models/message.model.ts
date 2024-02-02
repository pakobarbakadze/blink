import { ObjectType } from '@nestjs/graphql';
import { ModelQL } from 'src/common/models/model.model';

@ObjectType()
export class MessageQL extends ModelQL {
  content: string;
}
