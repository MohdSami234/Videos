// user.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from '../controller/user.controller';
import { UserService } from '../services/user.service';
import { User } from '../entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthGuard } from '../jwt-auth.guard';
import  {Video} from '../entities/video.entity';
import { WatchLater } from 'src/entities/watch-later.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: 'sami-video', 
      signOptions: { expiresIn: '1h' }, 
    }),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}


