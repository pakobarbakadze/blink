import { ObjectType } from '@nestjs/graphql';
import { ModelType } from 'src/common/models/model.model';

@ObjectType()
export class MessageType extends ModelType {
  content: string;
}
