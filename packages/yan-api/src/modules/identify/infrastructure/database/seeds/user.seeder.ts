import { randomUUID } from 'crypto';
import { UserEntity } from '../entities/user.entity';
import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { RoleEntity } from '../entities/role.entity';
import { Password } from '../../../domain/value-objects/password.vo';
import { UserRoleEntity } from '../entities/user-role.entity';

export default class CreateUser implements Seeder {
  public async run(ds: DataSource): Promise<any> {
    console.log('🌱 Seeding user...');
    const userRepository = ds.getRepository(UserEntity);
    const roleRepository = ds.getRepository(RoleEntity);
    const roleEntity: RoleEntity = await roleRepository.findOne({
      where: { name: 'Admin' },
    });
    const userEntity = new UserEntity();
    userEntity.id = randomUUID();
    userEntity.email = 'admin@gmail.com';
    const password = new Password('Admin@1234');
    userEntity.password = password.getHashedPassword();
    userEntity.salt = password.getSalt();
    const userRole = new UserRoleEntity();
    userRole.user = userEntity;
    userRole.role = roleEntity;
    userEntity.userRoles = [userRole];
    await userRepository.save(userEntity);
  }
}
