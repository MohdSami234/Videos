import { Entity, PrimaryGeneratedColumn, Column ,OneToMany } from 'typeorm';
import { WatchLater } from 'src/entities/watch-later.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: '' })
  token_session: string;

  @OneToMany(() => WatchLater, (watchLater) => watchLater.video)
  watchLater: WatchLater[];
  
}

