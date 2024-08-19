import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { UserRoleEntity } from './user-role.entity';

@Entity('users')
export class UserEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ type: 'date', name: 'date_of_birth' })
  dateOfBirth: Date;

  // consider use enum
  @Column()
  gender: string;

  @OneToMany(() => UserRoleEntity, (userRole) => userRole.user)
  userRoles: UserRoleEntity[];

  @Column()
  salt: string;
}
