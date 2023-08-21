// watch-later.controller.ts
import { Controller, UseGuards, Request, Post, Get, Delete, Param } from '@nestjs/common';
import { JwtAuthGuard } from '../jwt-auth.guard';
import { WatchLaterService } from '../services/watch-later.service';

@Controller('watch-later')
@UseGuards(JwtAuthGuard)
export class WatchLaterController {
  constructor(private readonly watchLaterService: WatchLaterService) {}

  @Post(':videoId')
  async addToWatchLater(@Request() req, @Param('videoId') videoId: number) {
    console.log(req.user)
    const userId = req.user.sub;
    console.log(userId)
    await this.watchLaterService.addToWatchLater(userId, videoId);
    return ('video added to your watch Later list succesfully')
  }

  @Post()
  async getWatchLaterList(@Request() req) {
    const userId = req.user.sub;
    const watchlatervideos = await  this.watchLaterService.getWatchLaterVideos(userId);
    if(!watchlatervideos || watchlatervideos.length===0){
      return ('No video added to you watchlater list')
    }
    return watchlatervideos
  }

  @Delete(':videoId')
  async removeFromWatchLater(@Request() req, @Param('videoId') videoId: number) {
    const userId = req.user.sub;
    await this.watchLaterService.removeFromWatchLater(userId, videoId);
    return ('video deleted successfully from your watchLater List')
  }
}

