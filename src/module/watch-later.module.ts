// watch-later.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { WatchLater } from '../entities/watch-later.entity';
import { WatchLaterController } from '../controller/watch-later.controller';
import { WatchLaterService } from '../services/watch-later.service';
import { VideoService } from 'src/services/video.service';
import { VideoController } from 'src/controller/video.controller';
import { Video } from 'src/entities/video.entity';
import { User } from 'src/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WatchLater,Video,User]),
  JwtModule.register({
    secret: 'your_secret_key', 
    signOptions: { expiresIn: '1h' },
  }),],
  controllers: [WatchLaterController],
  providers: [WatchLaterService,VideoService],
})
export class WatchLaterModule {}
 