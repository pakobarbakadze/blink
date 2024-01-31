import { Args, Query, Resolver } from '@nestjs/graphql';
import { ResourceArgs } from 'src/common/dto/resource.args';
import { PageInfoService } from 'src/common/services/page-info.service';
import { PaginatedPostQL } from '../models/post.model';
import { PostsService } from '../posts.service';

@Resolver(() => PaginatedPostQL)
export class PaginatedPostsResolver {
  constructor(
    private readonly postsService: PostsService,
    private readonly pageInfoService: PageInfoService,
  ) {}

  @Query(() => PaginatedPostQL, { name: 'posts' })
  async findAll(@Args() args: ResourceArgs): Promise<PaginatedPostQL> {
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
