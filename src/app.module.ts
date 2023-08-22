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
      host: 'dpg-cjier9r37aks7389ml4g-a.oregon-postgres.render.com', 
      port: 5432, 
      username: 'sami',
      password: 'FWz4IeLwf0LeJKr88Kuk68pTcjxVre3H',
      database: 'videos_uayk',
      entities: [User, WatchLater, Video], 
      synchronize: true, 
      ssl: true,

    }),
    UserModule,
    WatchLaterModule,
    VideoModule
    
  ],
  controllers: [AppController],
  providers: [ AppService ],
})
export class AppModule {}

