import { ObjectType } from '@nestjs/graphql';
import { Paginated } from 'src/common/types/interface/paginate.interface';

@ObjectType()
export class PostQL {
  title: string;
  content: string;
  // author: User;
}

@ObjectType()
export class PaginatedPostQL extends Paginated(PostQL) {}
