import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Video } from '../entities/video.entity';
import { VideoService } from '../services/video.service';
import { VideoController } from '../controller/video.controller';
import { YoutubeService } from 'src/services/youtube.service';
import { YoutubeCronJob } from 'src/video-cron.job';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [TypeOrmModule.forFeature([Video]),
  ScheduleModule.forRoot(),],
  providers: [VideoService,YoutubeCronJob,YoutubeService],
  controllers: [VideoController],
})
export class VideoModule {}

