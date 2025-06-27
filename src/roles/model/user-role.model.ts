import { Table, Column, Model, DataType, ForeignKey } from 'sequelize-typescript';
import { User } from 'src/users/model/user.model';
import { Role } from './role.model';


interface CreationUserRoleAttrs{
    userId : number,
    roleId : number
}
@Table({
  tableName: 'user_roles',
  timestamps: false,
})
export class UserRole extends Model<UserRole, CreationUserRoleAttrs> {
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId: number;

  @ForeignKey(() => Role)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  roleId: number;
} 