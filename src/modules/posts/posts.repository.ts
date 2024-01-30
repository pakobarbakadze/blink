import { InjectRepository } from '@nestjs/typeorm';
import {
  DeleteResult,
  FindManyOptions,
  FindOneOptions,
  Repository,
} from 'typeorm';
import { UpdatePostInput } from './dto/update-post.input';
import { Post } from './entities/post.entity';

export class PostsRepository {
  constructor(
    @InjectRepository(Post) private readonly postsRepository: Repository<Post>,
  ) {}

  public create(company: Partial<Post>): Post {
    return this.postsRepository.create(company);
  }

  public save(company: Post): Promise<Post> {
    return this.postsRepository.save(company);
  }

  public findOne(conditions: FindOneOptions<Post>): Promise<Post> {
    return this.postsRepository.findOne(conditions);
  }

  public find(conditions?: FindManyOptions<Post>): Promise<Post[]> {
    return this.postsRepository.find(conditions);
  }

  public update(id: number, updatePostInput: UpdatePostInput) {
    return this.postsRepository.update(id, updatePostInput);
  }

  public delete(id: number): Promise<DeleteResult> {
    return this.postsRepository.delete(id);
  }
}
