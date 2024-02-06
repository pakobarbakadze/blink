import { Injectable } from '@nestjs/common';
import { UpdateUserInput } from './dto/update-user.input';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  public findAll() {
    return this.userRepository.findAll();
  }

  public findOne(id: number) {
    return this.userRepository.findOne({ where: { id } });
  }

  public findWithPost(postId: number) {
    return this.userRepository.findOne({ where: { posts: { id: postId } } });
  }

  public update(id: number, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`;
  }

  public remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
