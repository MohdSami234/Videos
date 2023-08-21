import { Controller, Get, Param, Query } from '@nestjs/common';
import { VideoService } from '../services/video.service';

@Controller('videos')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Get()
  async getAllVideos(
    @Query('page') page,
    @Query('limit') limit,
  ) {
    const videoList = await this.videoService.getAllVideos(page, limit);
    if(videoList.length===0){
      return ('Videos Not Found')
    }
    return videoList
  }

  @Get('id')
  async getVideoById(@Query('id') id: number) {

    const video =  await this.videoService.getVideoById(id);
    if(!video){
      return ('video with this id not available')
    }
    return video
  }

  @Get('search')
  async search(@Query('title') title: string) {
    const videoBysearch = await  this.videoService.searchVideosByTitle(title);
    if(!videoBysearch || videoBysearch.length===0){
      return ('video with this title not available')
    }
    return videoBysearch

  }
}
