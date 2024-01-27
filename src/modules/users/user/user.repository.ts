import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, FindOptionsWhere, Repository } from 'typeorm';
import { User } from './entities/user.entity';

export class UserRepository {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  public create(user: Partial<User>): User {
    return this.userRepository.create(user);
  }

  public save(user: User): Promise<User> {
    return this.userRepository.save(user);
  }

  public findOne(conditions: FindOneOptions<User>): Promise<User> {
    return this.userRepository.findOne(conditions);
  }

  public findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  public update(conditions: FindOptionsWhere<User>, values: Partial<User>) {
    return this.userRepository.update(conditions, values);
  }
}
