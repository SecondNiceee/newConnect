import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'john_doe', description: 'Логин пользователя' })
  readonly login: string;

  @ApiProperty({ example: 'strongPassword123', description: 'Пароль пользователя' })
  readonly password: string;
}