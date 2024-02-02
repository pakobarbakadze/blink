import { InjectRepository } from '@nestjs/typeorm';
import {
  DeleteResult,
  FindManyOptions,
  FindOneOptions,
  Repository,
  UpdateResult,
} from 'typeorm';
import { UpdatePostInput } from './dto/update-post.input';
import { Post } from './entities/post.entity';

export class PostsRepository {
  constructor(
    @InjectRepository(Post) private readonly postsRepository: Repository<Post>,
  ) {}

  public create(post: Partial<Post>): Post {
    return this.postsRepository.create(post);
  }

  public save(post: Post): Promise<Post> {
    return this.postsRepository.save(post);
  }

  public findOne(conditions: FindOneOptions<Post>): Promise<Post> {
    return this.postsRepository.findOne(conditions);
  }

  public find(conditions?: FindManyOptions<Post>): Promise<Post[]> {
    return this.postsRepository.find(conditions);
  }

  public findAndCount(
    conditions?: FindManyOptions<Post>,
  ): Promise<[Post[], count: number]> {
    return this.postsRepository.findAndCount(conditions);
  }

  public update(
    id: number,
    updatePostInput: UpdatePostInput,
  ): Promise<UpdateResult> {
    return this.postsRepository.update(id, updatePostInput);
  }

  public delete(id: number): Promise<DeleteResult> {
    return this.postsRepository.delete(id);
  }
}
