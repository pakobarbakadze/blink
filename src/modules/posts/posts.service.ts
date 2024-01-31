import { Injectable } from '@nestjs/common';
import { GetResourceArgs } from 'src/common/dto/get-resource.args';
import { FindManyOptions, ILike } from 'typeorm';
import { User } from '../users/user/entities/user.entity';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { Post } from './entities/post.entity';
import { PaginatedPostQL } from './models/post.model';
import { PostsRepository } from './posts.repository';

@Injectable()
export class PostsService {
  constructor(private readonly postsRepository: PostsRepository) {}

  public create(createPostInput: CreatePostInput, author: User): Promise<Post> {
    const { title, content } = createPostInput;

    const post = this.postsRepository.create({
      title,
      content,
      author,
    });

    return this.postsRepository.save(post);
  }

  // TODO: return type should be entity
  // pagination should be handled in separate service
  public async findAll(args: GetResourceArgs): Promise<PaginatedPostQL> {
    const { search, sort, page, perPage } = args;

    const findOptions: FindManyOptions<Post> = {};

    if (search) {
      findOptions.where = {
        title: ILike(`%${search}%`),
      };
    }

    if (sort) {
      findOptions.order = {
        created_at: sort === 'asc' ? 'ASC' : 'DESC',
      };
    }

    findOptions.skip = (page - 1) * perPage;
    findOptions.take = perPage;

    const posts = await this.postsRepository.find(findOptions);

    return {
      edges: posts.map((post) => ({ cursor: post.id.toString(), node: post })),
      nodes: posts,
      totalCount: posts.length,
      hasNextPage: true,
    };
  }

  public findOne(id: number): Promise<Post> {
    return this.postsRepository.findOne({ where: { id } });
  }

  public update(id: number, updatePostInput: UpdatePostInput) {
    return this.postsRepository.update(id, updatePostInput);
  }

  public remove(id: number) {
    return this.postsRepository.delete(id);
  }
}
