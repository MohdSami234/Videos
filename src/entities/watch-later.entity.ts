import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';
import { Video } from './video.entity';

@Entity()
export class WatchLater {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.watchLater)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Video)
  @JoinColumn({ name: 'video_id' })
  video: Video;
}

