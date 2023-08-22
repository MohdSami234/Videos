import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { WatchLater } from './entities/watch-later.entity';
import { Video } from './entities/video.entity';
import { UserModule } from './module/user.module';
import { UserController } from './controller/user.controller';
import { UserService } from './services/user.service';
import { AppController } from './app.controller';
import { WatchLaterModule } from './module/watch-later.module';
import { AppService } from './app.service';
import { YoutubeCronJob } from './video-cron.job';
import { YoutubeService } from './services/youtube.service';
import { VideoModule } from './module/video.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres', 
      host: 'dpg-cji7kfvjbvhs73ahbtig-a', 
      port: 5432, 
      username: 'video_eswm_user',
      password: 'rZUVGVxUNH2bEF3yX64IawYLBxK2nEjI',
      database: 'video_eswm',
      entities: [User, WatchLater, Video], 
      synchronize: true, 
    }),
    UserModule,
    WatchLaterModule,
    VideoModule
    
  ],
  controllers: [AppController],
  providers: [ AppService ],
})
export class AppModule {}

