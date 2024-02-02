import { ObjectType } from '@nestjs/graphql';
import { ModelType } from 'src/common/models/model.model';
import { Paginated } from 'src/common/types/interface/paginate.interface';

@ObjectType()
export class PostType extends ModelType {
  title: string;
  content: string;
  // author: User;
}

@ObjectType()
export class PaginatedPostType extends Paginated(PostType) {}
