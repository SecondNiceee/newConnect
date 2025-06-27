import {
    Table,
    Column,
    Model,
    DataType,
    HasMany,
    BelongsToMany
  } from "sequelize-typescript"
  import { ApiProperty } from "@nestjs/swagger"
import { Promocode } from "src/promocodes/model/promocode.model"
import { UserPromocode } from "src/promocodes/model/user-promocode.model"
import { Role } from 'src/roles/model/role.model';
import { UserRole } from 'src/roles/model/user-role.model';
  
interface CreationUserAttr{
    login : string,
    password : string
}
  @Table({
    tableName: "users",
    timestamps: true,
    createdAt : false,
    updatedAt : false
  })
  export class User extends Model<User, CreationUserAttr> {
    @ApiProperty({ description: "ID пользователя", example: 1 })
    @Column({
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    })
    declare id: number
  
    @ApiProperty({ description: "Логин пользователя", example: "admin" })
    @Column({
      type: DataType.STRING,
      allowNull: false,
      unique: true,
    })
    login: string
  
    @ApiProperty({ description: "Захэшированный пароль пользователя" })
    @Column({
      type: DataType.STRING,
      allowNull: false,
    })
    password: string
  
    // Связь многие-ко-многим с промокодами через промежуточную таблицу
    @BelongsToMany(
      () => Promocode,
      () => UserPromocode,
    )
    promocodes: Promocode[]
  
    @BelongsToMany(() => Role, () => UserRole)
    roles: Role[];

    toJSON() {
      const values = { ...this.get() } as any;
      delete values.password;
      return values;
    }
  }