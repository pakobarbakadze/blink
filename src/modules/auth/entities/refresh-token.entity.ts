import { Model } from 'src/common/entities/model.entity';
import { User } from 'src/modules/users/entities/user.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity('refresh-tokens')
export class RefreshToken extends Model {
  @ManyToOne(() => User, (user) => user.id)
  user: User;

  @Column({ unique: true })
  refreshToken: string;

  @Column({ unique: true })
  deviceId: string;
}
