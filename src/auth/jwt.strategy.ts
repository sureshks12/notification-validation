// Example JwtStrategy implementation
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any) {
    //console.log('JWT Payload:', payload);
    return {
      userId: payload._id,
      email: payload.email,
      mobile: payload.mobile,
      name: payload.name,
      image: payload.image,
      roles: [payload.role], // Ensure roles are correctly extracted
    };
  }
}
