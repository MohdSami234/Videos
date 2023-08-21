import { Injectable ,Logger} from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { YoutubeService } from './services/youtube.service';
import { VideoService } from './services/video.service';

@Injectable()
export class YoutubeCronJob {
  constructor(
    private readonly youtubeService: YoutubeService,
    private readonly videoService: VideoService,
  ) {}

  @Cron(CronExpression.EVERY_2ND_HOUR)
  async handleCron() {
    const latestVideos = await this.youtubeService.fetchLatestVideos();
    console.log(latestVideos)

    const videosToSave = latestVideos.map(video => ({
      title: video.snippet.title,
      description: video.snippet.description,
      publishedAt: new Date(video.snippet.publishedAt),
      thumbnailUrl: video.snippet.thumbnails.default.url,
      videoUrl: `https://www.youtube.com/watch?v=${video.id.videoId}`,
    }));

    await this.videoService.createMany(videosToSave);
  }
}
