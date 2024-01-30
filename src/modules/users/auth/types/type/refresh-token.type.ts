import { User } from '../../../user/entities/user.entity';

export class InsertRefreshToken {
  user: User;
  deviceId?: string;
  token: string;
}
