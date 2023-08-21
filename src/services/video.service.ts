import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Video } from '../entities/video.entity';
import { ILike } from 'typeorm';


@Injectable()
export class VideoService {
  constructor(
    @InjectRepository(Video)
    private readonly videoRepository: Repository<Video>,
  ) {}

  async createMany(videos: Partial<Video>[]): Promise<void> {
    await this.videoRepository.save(videos);
  }

  async findOne(id: number): Promise<Video> {
    return this.videoRepository.findOne({ where: { id } }); 
  }

  async getAllVideos(page: number, limit: number): Promise<Video[]> {
    const skip = (page - 1) * limit;
    return this.videoRepository.find({
      skip,
      take: limit,
    });
  }

  async getVideoById(id: number): Promise<Video | undefined> {
    return this.videoRepository.findOne({ where: { id } });
  }

  async searchVideosByTitle(title: string): Promise<Video[]> {
    return this.videoRepository.find({
      where: {
        title: ILike(`%${title}%`),
      },
    });
  }
}
