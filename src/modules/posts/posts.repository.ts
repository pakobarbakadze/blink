import { InjectRepository } from '@nestjs/typeorm';
import { GenericRepository } from 'src/common/generic.repository';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';

export class PostsRepository extends GenericRepository<Post> {
  constructor(
    @InjectRepository(Post) private readonly postsRepository: Repository<Post>,
  ) {
    super(postsRepository);
  }
}
