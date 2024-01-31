import { ObjectType } from '@nestjs/graphql';
import { ModelQL } from 'src/common/models/model.model';
import { Paginated } from 'src/common/types/interface/paginate.interface';

@ObjectType()
export class PostQL extends ModelQL {
  title: string;
  content: string;
  // author: User;
}

@ObjectType()
export class PaginatedPostQL extends Paginated(PostQL) {}
