import { Body, Controller, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Вход пользователя' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: 201, description: 'Успешный вход', schema: { example: { message: 'Вы вошли' } } })
  @ApiResponse({ status: 404, description: 'Неверный логин или пароль' })
  async login(
    @Body() body: CreateUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.login(body.login, body.password, res);
  }

  @Post('logout')
  @ApiResponse({ status: 201, description: 'Успешный вход', schema: { example: { message: 'Вы вошли' } } })
  @ApiResponse({ status: 404, description: 'Неверный логин или пароль' })
  async logout(@Res({ passthrough: true }) res: Response) {
    return this.authService.logout(res);
  }
}
