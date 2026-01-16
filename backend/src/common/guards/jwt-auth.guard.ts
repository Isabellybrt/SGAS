import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    const auth = req.headers['authorization'];
    if (!auth || typeof auth !== 'string') throw new UnauthorizedException();
    const parts = auth.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') throw new UnauthorizedException();
    try {
      const payload = jwt.verify(parts[1], process.env.JWT_SECRET as string) as any;
      req.user = payload;
      return true;
    } catch {
      throw new UnauthorizedException();
    }
  }
}
