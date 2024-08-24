import { Repository } from 'typeorm';
import { UserRepositoryPort } from '../../../application/user/user.repository.port';
import { User } from '../../../domain/entities/user';
import { UserEntity } from '../entities/user.entity';
import { UserMapper } from '../../../mapper/user.mapper';
import { InjectRepository } from '@nestjs/typeorm';
import { Inject } from '@nestjs/common';
import { ROLE_REPOSITORY } from '../../di/role.di-tokens';
import { RoleRepository } from './role.repository';
import { UserRoleEntity } from '../entities/user-role.entity';

export class UserRepository implements UserRepositoryPort {
  constructor(
    @InjectRepository(UserEntity as any)
    private readonly userRepository: Repository<UserEntity>,
    @Inject(ROLE_REPOSITORY)
    private readonly roleRepository: RoleRepository,
  ) {}

  async createUser(entity: User): Promise<void> {
    const mapper = new UserMapper();
    const user: UserEntity = mapper.toPersistence(entity);
    const roles = await this.roleRepository.findBy(entity.getRoles());
    user.userRoles = roles.map((role) => {
      const userRole = new UserRoleEntity();
      userRole.role = role;
      userRole.user = user;
      return userRole;
    });
    await this.userRepository.save(user);
  }

  async findByEmail(email: string): Promise<UserEntity> {
    return this.userRepository.findOne({
      where: { email },
      relations: ['userRoles', 'userRoles.role'],
    });
  }

  findOneById(id: string): Promise<UserEntity> {
    return this.userRepository.findOne({
      where: { id: id },
      relations: [
        'userRoles',
        'userRoles.role',
        'userRoles.role.rolePermissions',
        'userRoles.role.rolePermissions.permission',
      ],
    });
  }
}
