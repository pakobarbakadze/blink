import { InjectRepository } from '@nestjs/typeorm';
import { GenericRepository } from 'src/common/generic.repository';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

export class UserRepository extends GenericRepository<User> {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {
    super(userRepository);
  }
}
