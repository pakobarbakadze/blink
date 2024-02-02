import { Model } from 'src/common/entities/model.entity';
import { User } from 'src/modules/users/user/entities/user.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity('messages')
export class Message extends Model {
  @Column()
  content: string;

  @ManyToOne(() => User, (user) => user.messages)
  sender: User;
}
