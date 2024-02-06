import { Injectable } from '@nestjs/common';
import { UpdateUserInput } from './dto/update-user.input';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  public findAll() {
    return this.usersRepository.findAll();
  }

  public findOne(id: number) {
    return this.usersRepository.findOne({ where: { id } });
  }

  public findWithPost(postId: number) {
    return this.usersRepository.findOne({ where: { posts: { id: postId } } });
  }

  public update(id: number, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`;
  }

  public remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
