import { Table, Column, Model, DataType, BelongsToMany } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/model/user.model';
import { UserRole } from './user-role.model';


interface CreatioonUserAttrs{
    value : string,
    description : string,
}
@Table({
  tableName: 'roles',
  timestamps: false,
})
export class Role extends Model<Role, CreatioonUserAttrs> {
  @ApiProperty({ description: 'ID роли', example: 1 })
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  declare id: number;

  @ApiProperty({ description: 'Название роли', example: 'ADMIN' })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  value: string;

  @ApiProperty({ description: 'Описание роли', example: 'Администратор' })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  description: string;

  @BelongsToMany(() => User, () => UserRole)
  users: User[];
}
