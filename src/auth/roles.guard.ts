import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private jwtService: JwtService,) {}
  
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('Token not provided');
    }
    try {
      const user = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      });
      if (!user || !user.role || !user.notify) {
         throw new UnauthorizedException('Invalid token structure');
      }
      console.log('User role:', user.role);
      console.log('User notify permission:', user.notify);
      // Validate the role and notify:true requirement
      if (user.role === 'admin' && user.notify) {
        // Optionally log RBAC validation result
        context.switchToHttp().getResponse().rbacValidationResult = {
          isAdmin: true,
          hasNotifyPermission: user.notify,
        };
        return true;
      } else {
        throw new ForbiddenException(
          'Admin role and notify permission required',
        );
      }
    } catch (err) {
      console.error('Token verification failed:', err);
      throw new UnauthorizedException('Invalid token');
    }
  }
}