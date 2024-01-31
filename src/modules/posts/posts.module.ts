import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { PaginatedPostsResolver } from './paginated-posts.resolver';
import { PostsRepository } from './posts.repository';
import { PostsResolver } from './posts.resolver';
import { PostsService } from './posts.service';

@Module({
  imports: [TypeOrmModule.forFeature([Post])],
  providers: [
    PostsResolver,
    PaginatedPostsResolver,
    PostsService,
    PostsRepository,
  ],
})
export class PostsModule {}
