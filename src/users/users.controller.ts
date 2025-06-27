import {
    Controller,
    Post,
    Body,
    Get,
    HttpStatus,
    Delete,
      Query,
    Req,
    UseGuards,
  } from '@nestjs/common';
  import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
  
  import { UsersService } from './users.service';
  import { CreateUserDto } from './dto/create-user.dto';
  import { User } from './model/user.model';
import { DeleteUserResponse } from './dto/delete-user-response.dto';
import { DeleteUserDto } from './dto/delete-user.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { ApiKeyGuard } from 'src/auth/guards/api-key.guard';
  
  @ApiTags('Users') // Группа в Swagger UI
  @Controller('users')
  export class UsersController {
    constructor(private readonly userService: UsersService) {}

    @UseGuards(AuthGuard)
    @Get("/profile")
    @ApiOperation({summary : "Получение профиля пользователя"})
    @ApiResponse({type : User})
    async findProfile(@Req() req : Request){
      return await this.userService.findProfile(req);
    }
    @UseGuards(ApiKeyGuard)
    @Delete('/delete')
    @ApiOperation({summary : "Удаление юзреа"})
    @ApiResponse({type : DeleteUserResponse})
    async deleteUser(@Query() dto : DeleteUserDto){
        return await this.userService.deleteUser(dto.userId);
    }
    
    @UseGuards(ApiKeyGuard)
    @Post('/create')
    @ApiOperation({ summary: 'Создание пользователя' })
    @ApiBody({ type: CreateUserDto })
    @ApiResponse({
      status: 200,
      description: 'Пользователь успешно создан',
      type: User,
    })
    async createUser(@Body() dto: CreateUserDto) {
      return await this.userService.createUser(dto);
    }
  
    @UseGuards(ApiKeyGuard)
    @Get('/findAll')
    @ApiOperation({ summary: 'Получение всех пользователей' })
    @ApiResponse({
      status: HttpStatus.OK,
      description: 'Список пользователей',
      type: [User],
    })
    async findAll() {
      return await this.userService.findAll();
    }
  }