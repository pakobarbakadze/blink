import { Injectable } from '@nestjs/common';
import { ResourceArgs } from 'src/common/dto/resource.args';
import { FindManyOptions, ILike } from 'typeorm';
import { User } from '../users/user/entities/user.entity';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { Post } from './entities/post.entity';
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

  public findAndCount(
    args: ResourceArgs,
  ): Promise<[Post[], totalCount: number]> {
    const { search, sort, page, perPage } = args;

    const findOptions: FindManyOptions<Post> = {
      where: search ? { title: ILike(`%${search}%`) } : undefined,
      order: sort
        ? { created_at: sort.toUpperCase() as 'ASC' | 'DESC' }
        : undefined,
      skip: (page - 1) * perPage,
      take: perPage,
    };

    return this.postsRepository.findAndCount(findOptions);
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
