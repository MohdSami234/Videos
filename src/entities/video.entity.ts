import { Entity, PrimaryGeneratedColumn, Column ,OneToMany} from 'typeorm';
import { WatchLater } from 'src/entities/watch-later.entity';

@Entity()
export class Video {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  publishedAt: Date;

  @Column()
  thumbnailUrl: string;

  @Column()
  videoUrl: string;

  @OneToMany(() => WatchLater, (watchLater) => watchLater.video)
  watchLater: WatchLater[];
}
