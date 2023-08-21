// user.controller.ts

import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { User } from '../entities/user.entity';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body() user: User) {
    if(!user.email || !user.password){
      return ('please provide email id and password to registed' );
    }
    const  userdata = await this.userService.findByEmail(user.email);
    if (userdata) {
       return("User already registered with this email ID . Please use different emailId")
    }
    user.password = await this.userService.hashPassword(user.password);
    await this.userService.create(user);
    return  ('You are registered successfully')
  }

  @Post('login')
  async login(@Body() credentials: { email: string; password: string }) {
    if(!credentials.email || !credentials.password){
      return ('please provide email id and password to registed' );
    }
    const user = await this.userService.findByEmail(credentials.email);
    if (!user) {
      return('User not  registered');
    }
    const passwordMatch = await this.userService.comparePasswords(
      credentials.password,
      user.password,
    );
    if (!passwordMatch) {
      return('Invalid password');
    }
    const token =await this.userService.generateToken(user,credentials.email);
    await this.userService.updateUserTokenSession(user,token);

    return  token ;
  }
  
  @Post('logout')
  async logout(@Body() credentials: { email: string; password: string }) {
    if(!credentials.email || !credentials.password){
      return ('please provide email id and password to registed' );
    }
    const user = await this.userService.findByEmail(credentials.email);
    console.log(user)
    if (!user) {
      return('User not registered');
    }

    const passwordMatch = await this.userService.comparePasswords(
      credentials.password,
      user.password,
    );
    if (!passwordMatch) {
      return('Invalid password');
    }

    if(user.token_session.length===0){
      return('you have already logout')
    }
    
    await this.userService.updateUserTokenSession(user,"");

    return  ('Logout Successfully') ;
  }
}

