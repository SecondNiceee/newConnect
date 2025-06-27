import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from "sequelize-typescript"
import { Promocode } from "./promocode.model"
import { ApiProperty } from "@nestjs/swagger"
import { User } from "src/users/model/user.model"


interface UserPromocodeCreationAttrs{
  userId : number,
  promocodeId : number,
  node : number,
  referrerId : number | null
}
@Table({
  tableName: "user_promocodes",
  timestamps: true,
})
export class UserPromocode extends Model<UserPromocode> {
  @ApiProperty({ description: "ID записи", example: 1 })
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  declare id: number

  @ApiProperty({ description: "ID пользователя", example: 1 })
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId: number

  @ApiProperty({ description: "ID промокода", example: 1 })
  @ForeignKey(() => Promocode)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  promocodeId: number

  // Уровень в иерархии: 1 - владелец, 2 - получил от владельца, и т.д.
  @ApiProperty({ description: "Уровень в иерархии (1 - владелец, 2+ - получившие)", example: 1 })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 2,
  })
  node: number

  // ID пользователя, от которого получен промокод (для отслеживания цепочки)
  @ApiProperty({ description: "ID пользователя, от которого получен промокод", example: null, nullable: true })
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  referrerId: number | null;

  @BelongsTo(() => User, "userId")
  user: User

  @BelongsTo(() => Promocode, "promocodeId")
  promocode: Promocode

  @BelongsTo(() => User, "referrerId")
  referrer: User
}
