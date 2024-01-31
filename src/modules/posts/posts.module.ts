import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaginationService } from 'src/common/services/pagination.service';
import { Post } from './entities/post.entity';
import { PostsRepository } from './posts.repository';
import { PostsResolver } from './posts.resolver';
import { PostsService } from './posts.service';

@Module({
  imports: [TypeOrmModule.forFeature([Post])],
  providers: [PostsResolver, PostsService, PostsRepository, PaginationService],
})
export class PostsModule {}
