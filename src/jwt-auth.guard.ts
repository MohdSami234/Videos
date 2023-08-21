// jwt-email.guard.ts
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const token = request.body.token || request.params.token || request.headers['authorization'];
    const emailbody = request.body.email
    if (!token) {
      throw new UnauthorizedException('Token is missing');
    }
    

    try {
        console.log("Verifying token:", token); 
        const decoded = await this.jwtService.verify(token,{
            secret: 'sami-video', 
          });
        const userEmail = decoded.email;
    
        if (!userEmail) { 
            console.log("Invalid token: Missing email"); 
            throw new UnauthorizedException('Invalid token');
        }
        if(emailbody!==userEmail){
            throw new UnauthorizedException('Incorrect Token');
        }
        request.user = decoded;
    
        return true;
    } catch (err) {
        console.log("Token verification error:", err); 
        throw new UnauthorizedException('Invalid token');
    }
    
  }
}
