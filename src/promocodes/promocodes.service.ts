import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Promocode } from './model/promocode.model';
import { UserPromocode } from './model/user-promocode.model';
import { UsersService } from 'src/users/users.service';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class PromocodesService {
  constructor(@InjectModel(Promocode) private promocodeRepository: typeof Promocode,
@InjectModel(UserPromocode) private userPromocodeRepository:typeof UserPromocode,
private userService: UsersService) {}
  async findAllByUserWithNode(userId: number): Promise<{ promocode: Promocode; node: number }[]> {
    const userPromocodes = await UserPromocode.findAll({
      where: { userId },
      include: [Promocode],
    });
    return userPromocodes.map(up => ({
      promocode: up.promocode,
      node: up.node,
    }));
  }

  async findAllPromocodes(){
    const promocodes = await this.promocodeRepository.findAll()
    return promocodes;
  };

  async createPromocode(data: { code: string; description?: string; ownerId: number }): Promise<Promocode> {
    const candidate = await this.userService.findById(data.ownerId);
    if (!candidate){
      throw new BadRequestException("Пользователь не найден");
    }
    const promocode = await this.promocodeRepository.create(data as any);

    await this.userPromocodeRepository.create({
        userId : data.ownerId,
        promocodeId : promocode.id,
        node : 1,
        referrerId : null
    } as any)

    return promocode;
  }

  async findByCode(code: string): Promise<Promocode> {
    const promocode = await this.promocodeRepository.findOne({ where: { code } });
    if (!promocode) {
      throw new NotFoundException('Промокод не найден');
    }
    return promocode;
  }

  async incrementSales(promocodeId: number): Promise<Promocode> {
    const [affectedCount, [updatedPromocode]] = await this.promocodeRepository.update(
      {
        sales: Sequelize.literal('sales + 1'),
      },
      {
        where: { id: promocodeId },
        returning: true,
      }
    );
  
    if (affectedCount === 0) {
      throw new NotFoundException('Промокод не найден');
    }
  
    return updatedPromocode;
  }
}
