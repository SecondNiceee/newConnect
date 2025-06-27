import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './model/user.model';
import { Role } from 'src/roles/model/role.model';
import { UserRole } from 'src/roles/model/user-role.model';
import { Promocode } from 'src/promocodes/model/promocode.model';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    @InjectModel(Role) private roleRepository: typeof Role,
    @InjectModel(UserRole) private userRoleRepository: typeof UserRole,
  ) {}


  async findByLogin(login: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { login } });
  }

  async findById(id : number){
    return await this.userRepository.findByPk(id);
  }

  async findAll() {
    const users = this.userRepository.findAll({
        include: [
            {
              model: Role,
              through: { attributes: [] },
            },
            {
              model: Promocode,
              as: 'promocodes', // связь BelongsToMany (пользователь получил доступ)
              through: { attributes: ['node'] },
            }
          ],
    });
    return users;
  }

  async findProfile(req: any){
    if (!req.user){
      throw new UnauthorizedException("Пользователь не авторизован")
    }
    const {sub} = req.user;
    const user = await this.userRepository.findByPk(sub, {include : [
      {
        model : Promocode,
        through : {
          attributes : []
        }
      }
    ]});
    return user;
  }


  async deleteUser(userId: number) {
    const user = await this.userRepository.findByPk(userId);
  
    if (!user) {
      return {
        success: false,
        message: `User with ID ${userId} not found`,
      };
    }
  
    await user.destroy();

    return {
      success: true,
      message: 'User deleted successfully',
    };
  }

  async createUser(userData: {
    login: string;
    password: string;
  }): Promise<User> {

    const hash = await bcrypt.hash(userData.password, 7); 

    const candidate = await this.userRepository.findOne({where : {login : userData.login}});
    if (candidate){
      throw new BadRequestException("Пользователь с таким login уже существует")
    }

    const user = this.userRepository.build({
      login: userData.login,
      password: hash, 
    });
    await user.save();
  
    let role = await this.roleRepository.findOne({ where: { value: 'USER' } });
  
    if (!role) {
      role = this.roleRepository.build({
        value: 'USER',
        description: 'Обычный пользователь',
      });
      await role.save();
    }
  
    const userRole = this.userRoleRepository.build({
      userId: user.id,
      roleId: role.id,
    });
    await userRole.save();

    const userWithRoles = await this.userRepository.findByPk(user.id, {
      include: {
        model: Role,
        through: {
          attributes: [],
        },
      },
    });
  
    if (!userWithRoles) throw new Error('User not found after creation');
  
    return userWithRoles;

  }
}
