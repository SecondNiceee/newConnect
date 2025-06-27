import { Module } from '@nestjs/common';
import {ConfigModule} from "@nestjs/config";
import { UsersModule } from './users/users.module';
import { PromocodesModule } from './promocodes/promocodes.module';
import { AuthModule } from './auth/auth.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users/model/user.model';
import { Promocode } from './promocodes/model/promocode.model';
import { UserPromocode } from './promocodes/model/user-promocode.model';
import { Role } from './roles/model/role.model';
import { UserRole } from './roles/model/user-role.model';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    SequelizeModule.forRoot({
      dialect : "postgres",
      host : process.env.POSTGRES_HOST,
      port : Number(process.env.POSTGRES_PORT) || 5432,
      username : process.env.POSTGRES_USER,
      password : process.env.POSTGRES_PASSWORD,
      database : process.env.POSTGRES_DB,
      models : [User, Promocode, UserPromocode, Role, UserRole],
      autoLoadModels:true
    }),
    UsersModule,
    PromocodesModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
