import { InjectRepository } from '@nestjs/typeorm';
import { GenericRepository } from 'src/common/generic.repository';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

export class UsersRepository extends GenericRepository<User> {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {
    super(usersRepository);
  }
}
