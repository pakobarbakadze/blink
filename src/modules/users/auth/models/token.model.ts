import { ObjectType } from '@nestjs/graphql';
import { ModelQL } from 'src/common/models/model.model';

@ObjectType()
export class TokensQl extends ModelQL {
  access_token: string;
  refresh_token: string;
}
