import * as bcrypt from 'bcrypt';
import { Model } from 'src/common/entities/model.entity';
import { BeforeInsert, Column, Entity } from 'typeorm';

@Entity('users')
export class User extends Model {
  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }

  @BeforeInsert()
  async hashPass() {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
  }
}
