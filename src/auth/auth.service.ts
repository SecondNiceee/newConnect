import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async logout(res: Response) {
    res.clearCookie('jwt', {
      httpOnly: true,
      sameSite: 'lax',
      secure: true,
    });
    return { message: 'Вы вышли' };
  }

  async login(login: string, password: string, res: Response) {
    const user = await this.usersService.findByLogin(login);

    if (!user) {
      throw new NotFoundException('Неверный логин или пароль');
    }
    const isMatch = await bcrypt.compare(password, user.dataValues.password);
    if (!isMatch) {
      throw new NotFoundException('Неверный логин или пароль');
    }
    const payload = { sub: user.id, login: user.login , roles : user.roles};
    const token = await this.jwtService.signAsync(payload, { expiresIn: '30d' });
    res.cookie('jwt', token, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 дней
      sameSite: 'lax',
      secure : true
    });
    return { message: 'Вы вошли' };
  }
} 