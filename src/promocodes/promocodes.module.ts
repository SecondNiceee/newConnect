import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { PromocodesController } from './promocodes.controller';
import { PromocodesService } from './promocodes.service';
import { Promocode } from './model/promocode.model';
import { UserPromocode } from './model/user-promocode.model';
import { UsersModule } from 'src/users/users.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [SequelizeModule.forFeature([Promocode, UserPromocode]), UsersModule, AuthModule],
  controllers: [PromocodesController],
  providers: [PromocodesService],
  exports: [PromocodesService],
})
export class PromocodesModule {}
