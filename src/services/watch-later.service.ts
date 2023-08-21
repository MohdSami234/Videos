// watch-later.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WatchLater } from '../entities/watch-later.entity';
import { User } from 'src/entities/user.entity';
import { Video } from 'src/entities/video.entity';

@Injectable()
export class WatchLaterService {
  constructor(
    @InjectRepository(WatchLater)
    private readonly watchLaterRepository: Repository<WatchLater>,
    @InjectRepository(User) 
    private readonly userRepository: Repository<User>,
    @InjectRepository(Video) 
    private readonly videoRepository: Repository<Video>,
  ) {}

  async addToWatchLater(userId: number, videoId: number): Promise<string> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    const video = await this.videoRepository.findOne({ where: { id: videoId } });
    const checkvideoinwatchlist = await this.watchLaterRepository.findOne({ where: { video: { id: videoId }} });
    if (!user || !video) {
       return ('User or video not found');
    }
    if(checkvideoinwatchlist){ 
      return('you have already added this video in your watchlater list')
    }
     const watchLaterEntry = new WatchLater();
     watchLaterEntry.user = user; 
     watchLaterEntry.video = video; 
    await this.watchLaterRepository.save(watchLaterEntry);
    return ('you  have successfully added this video in you watchlater list')
  }
   
  async getWatchLaterVideos(userId: number): Promise<Video[]> {
    const watchLaterEntries = await this.watchLaterRepository.find({ where: {user: { id: userId }}, relations: ['video'] });
    return watchLaterEntries.map(entry => entry.video);
  }

  async removeFromWatchLater(userId: number, videoId: number): Promise<string> {
    const watchLaterEntry = await this.watchLaterRepository.findOne({
      where: { user: { id: userId }, video: { id: videoId } },
    });
  
    if (watchLaterEntry) {
      await this.watchLaterRepository.remove(watchLaterEntry);
      return ('Video deleted from your Watch Later')
    }
    return ('Video Not in Your Watch Later List')
  }
  
}

