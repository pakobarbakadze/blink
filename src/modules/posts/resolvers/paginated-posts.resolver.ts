import { Args, Query, Resolver } from '@nestjs/graphql';
import { ResourceArgs } from 'src/common/dto/resource.args';
import { PageInfoService } from 'src/common/services/page-info.service';
import { PaginatedPostType } from '../models/post.model';
import { PostsService } from '../posts.service';

@Resolver(() => PaginatedPostType)
export class PaginatedPostsResolver {
  constructor(
    private readonly postsService: PostsService,
    private readonly pageInfoService: PageInfoService,
  ) {}

  @Query(() => PaginatedPostType, { name: 'posts' })
  async findAll(@Args() args: ResourceArgs): Promise<PaginatedPostType> {
    const { page, perPage } = args;
    const [posts, totalCount] = await this.postsService.findAndCount(args);

    const pageInfo = this.pageInfoService.getPageInfo(
      page,
      perPage,
      totalCount,
    );

    return {
      data: posts,
      pageInfo,
    };
  }
}
