import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GetResourceArgs } from 'src/common/dto/get-resource.args';
import { CurrentUser } from '../users/auth/decorators/current-user.decorator';
import { JwtAuthGuard } from '../users/auth/guards/jwt-auth.guard';
import { User } from '../users/user/entities/user.entity';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { PostQL } from './models/post.model';
import { PostsService } from './posts.service';

@Resolver(() => PostQL)
export class PostsResolver {
  constructor(private readonly postsService: PostsService) {}

  @Mutation(() => PostQL)
  @UseGuards(JwtAuthGuard)
  createPost(
    @Args('createPostInput') createPostInput: CreatePostInput,
    @CurrentUser() user: User,
  ) {
    return this.postsService.create(createPostInput, user);
  }

  @Query(() => [PostQL], { name: 'posts' })
  findAll(@Args() args: GetResourceArgs) {
    return this.postsService.findAll(args);
  }

  @Query(() => PostQL, { name: 'post' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.postsService.findOne(id);
  }

  @Mutation(() => PostQL)
  @UseGuards(JwtAuthGuard)
  updatePost(@Args('updatePostInput') updatePostInput: UpdatePostInput) {
    return this.postsService.update(updatePostInput.id, updatePostInput);
  }

  @Mutation(() => PostQL)
  @UseGuards(JwtAuthGuard)
  removePost(@Args('id', { type: () => Int }) id: number) {
    return this.postsService.remove(id);
  }
}
