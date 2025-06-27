import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import getCookieValue from '../utils/getCookieValue';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = getCookieValue("jwt" , request.headers?.cookie);
    if (!token) {
      throw new UnauthorizedException('Нет JWT cookie');
    }
    try {
      const payload = await this.jwtService.verifyAsync(token);
      request['user'] = payload;
      return true;
    } catch (e) {
      throw new UnauthorizedException('Невалидный JWT');
    }
  }
}
