// user.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async create(user: User): Promise<User> {
  
    return this.userRepository.save(user);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { email } });
  }
  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  }

  async comparePasswords(inputPassword: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(inputPassword, hashedPassword);
  }
  async generateToken(user: User,email:string): Promise<string> {
    const payload = { sub: user.id ,email:email };
    console.log(payload)
    return this.jwtService.sign(payload);
  }

  async updateUserTokenSession(user: User, token: string) {
    user.token_session = token;
    return this.userRepository.save(user);
  }
}

