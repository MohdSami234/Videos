// auth.module.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from '../controller/user.controller';
import { UserService } from '../services/user.service';
//import { JwtStrategy } from './jwt.strategy';
import { User } from '../entities/user.entity';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'YOUR_SECRET_KEY', // Replace with your secret key
      signOptions: { expiresIn: '1h' }, // Token expiration time
    }),
    TypeOrmModule.forFeature([User]), 
  ],
  controllers: [UserController],
  providers: [UserService, UserService],
  exports: [PassportModule, JwtModule],
})
export class AuthModule {}
