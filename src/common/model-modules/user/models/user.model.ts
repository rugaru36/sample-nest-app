import {
  AllowNull,
  Column,
  CreatedAt,
  Model,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { DATE, ENUM, INTEGER, STRING, TINYINT } from 'sequelize';
import { UserRoleEnum } from '../../../enums/user-role.enum';

@Table({
  tableName: 'Users',
  timestamps: true,
  collate: 'utf8_general_ci',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
})
export class UserModel extends Model<UserModel> {
  @Column({
    type: INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  })
  public id: number;

  @Column({ type: STRING })
  public password: string;

  @AllowNull(true)
  @Column({ type: STRING })
  public login: string | null;

  @AllowNull(true)
  @Column({ type: STRING })
  public email: string | null;

  @Column({ type: ENUM(...Object.values(UserRoleEnum)) })
  public role: UserRoleEnum;

  @Column({ type: TINYINT })
  public is_verified: boolean;

  @Column({ type: STRING })
  public password_salt: string;

  @Column({ type: DATE })
  public last_login: Date;

  @CreatedAt
  @Column({ type: DATE })
  public created_at: Date;

  @UpdatedAt
  @Column({ type: DATE })
  public updated_at: Date;
}
