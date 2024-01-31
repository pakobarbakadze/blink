import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { ResourceArgs } from 'src/common/dto/resource.args';
import { PageInfoQL } from 'src/common/models/page-info.model';
import { PaginatedPostQL } from './models/post.model';
import { PostsService } from './posts.service';

@Resolver(() => PaginatedPostQL)
export class PaginatedPostsResolver {
  constructor(private readonly postsService: PostsService) {}

  @Query(() => PaginatedPostQL, { name: 'posts' })
  async findAll(@Args() args: ResourceArgs): Promise<PaginatedPostQL> {
    const data = await this.postsService.findAll(args);
    return { data };
  }

  @ResolveField('pageInfo', () => PageInfoQL)
  async getPageInfo(
    @Parent() paginatedPostQL: PaginatedPostQL,
  ): Promise<PageInfoQL> {
    return { currentPage: 1, totalPages: 2, hasNextPage: true };
  }
}
