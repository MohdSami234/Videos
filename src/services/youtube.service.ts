import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class YoutubeService {
  async fetchLatestVideos(): Promise<any[]> {
    const apiKey = 'AIzaSyD7isBkmeejGgeSACsrpPrkpEXcKr1EFGY';
    const maxResults = 10;
 console.log(maxResults)
    const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
      params: {
        key: apiKey,
        maxResults,
        order: 'date',
        part: 'snippet',
      },
    });
   

    return response.data.items;
  }
}

