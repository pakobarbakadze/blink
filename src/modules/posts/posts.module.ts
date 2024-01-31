import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PageInfoService } from 'src/common/services/page-info.service';
import { Post } from './entities/post.entity';
import { PostsRepository } from './posts.repository';
import { PostsService } from './posts.service';
import { PaginatedPostsResolver } from './resolvers/paginated-posts.resolver';
import { PostsResolver } from './resolvers/posts.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Post])],
  providers: [
    PostsResolver,
    PaginatedPostsResolver,
    PostsService,
    PageInfoService,
    PostsRepository,
  ],
})
export class PostsModule {}
