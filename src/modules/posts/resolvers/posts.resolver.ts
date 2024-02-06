import { UseGuards } from '@nestjs/common';
import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { UserType } from 'src/common/models/user.model';
import { CurrentUser } from 'src/modules/auth/decorators/current-user.decorator';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { UsersService } from 'src/modules/users/users.service';
import { User } from '../../users/entities/user.entity';
import { CreatePostInput } from '../dto/create-post.input';
import { UpdatePostInput } from '../dto/update-post.input';
import { PostType } from '../models/post.model';
import { PostsService } from '../posts.service';

@Resolver(() => PostType)
export class PostsResolver {
  constructor(
    private readonly postsService: PostsService,
    private readonly usersService: UsersService,
  ) {}

  @Mutation(() => PostType)
  @UseGuards(JwtAuthGuard)
  createPost(
    @Args('createPostInput') createPostInput: CreatePostInput,
    @CurrentUser() user: User,
  ): Promise<PostType> {
    return this.postsService.create(createPostInput, user);
  }

  @Query(() => PostType, { name: 'post' })
  findOne(@Args('id', { type: () => Int }) id: number): Promise<PostType> {
    return this.postsService.findOne(id);
  }

  @Mutation(() => PostType)
  @UseGuards(JwtAuthGuard)
  updatePost(@Args('updatePostInput') updatePostInput: UpdatePostInput) {
    return this.postsService.update(updatePostInput.id, updatePostInput);
  }

  @Mutation(() => PostType)
  @UseGuards(JwtAuthGuard)
  removePost(@Args('id', { type: () => Int }) id: number) {
    return this.postsService.remove(id);
  }

  @ResolveField('author', () => UserType)
  async getAuthor(@Parent() post: PostType) {
    const { id } = post;
    return this.usersService.findWithPost(id);
  }
}
