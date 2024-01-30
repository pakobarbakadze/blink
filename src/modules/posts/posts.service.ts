import { Injectable } from '@nestjs/common';
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

  public findAll() {
    return this.postsRepository.find();
  }

  public findOne(id: number) {
    return this.postsRepository.findOne({ where: { id } });
  }

  public update(id: number, updatePostInput: UpdatePostInput) {
    return this.postsRepository.update(id, updatePostInput);
  }

  public remove(id: number) {
    return this.postsRepository.delete(id);
  }
}
