import { Field, ObjectType } from '@nestjs/graphql';
import { ModelType } from 'src/common/models/model.model';
import { UserType } from 'src/common/models/user.model';
import { Paginated } from 'src/common/types/interface/paginate.interface';

@ObjectType()
export class PostType extends ModelType {
  title: string;
  content: string;

  @Field(() => UserType)
  author: UserType;
}

@ObjectType()
export class PaginatedPostType extends Paginated(PostType) {}
