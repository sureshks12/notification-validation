import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async createToken(userId: string, roles: string[]): Promise<string> {
    const payload = { userId, roles };
    return this.jwtService.sign(payload);
  }
}
