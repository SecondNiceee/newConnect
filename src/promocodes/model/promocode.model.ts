import { Table, Column, Model, DataType, ForeignKey, BelongsTo, BelongsToMany, HasMany } from "sequelize-typescript"
import { ApiProperty } from "@nestjs/swagger"
import { User } from "src/users/model/user.model"
import { UserPromocode } from "./user-promocode.model"


interface CraatePromocodeAttrs{
    code : string,
    description : string,
    ownerId : number
}

@Table({
  tableName: "promocodes",
  timestamps: true,
  createdAt : false,
  updatedAt : false
})
export class Promocode extends Model<Promocode, CraatePromocodeAttrs> {
  @ApiProperty({ description: "ID промокода", example: 1 })
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  declare id: number

  @ApiProperty({ description: "Код промокода", example: "PROMO2024" })
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  code: string

  @ApiProperty({ description: "Описание промокода", example: "Новогодняя скидка 20%" })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  description: string

  @ApiProperty({ description: "Количество продаж промокода", example: 0 })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 0,
  })
  sales: number

  @ApiProperty({ description: "Скидка в процентах", example: 10 })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 10,
  })
  discountPercent: number

  // ID владельца промокода (node: 1)
  @ApiProperty({ description: "ID владельца промокода", example: 1 })
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  ownerId: number




  // Связь многие-ко-многим с пользователями через промежуточную таблицу
  @BelongsToMany(
    () => User,
    () => UserPromocode,
  )
  users: User[]

  // Прямая связь с промежуточной таблицей для доступа к node
  @HasMany(() => UserPromocode)
  userPromocodes: UserPromocode[]
}