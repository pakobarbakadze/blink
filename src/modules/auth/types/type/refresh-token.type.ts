import { User } from 'src/modules/users/entities/user.entity';

export class InsertRefreshToken {
  user: User;
  deviceId: string;
  token: string;
}
