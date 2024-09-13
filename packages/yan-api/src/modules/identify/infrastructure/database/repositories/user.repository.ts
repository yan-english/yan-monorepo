import { FindManyOptions, Like, Repository } from 'typeorm';
import { UserRepositoryPort } from '../../../application/user/user.repository.port';
import { User } from '../../../domain/entities/user';
import { UserEntity } from '../entities/user.entity';
import { UserMapper } from '../../../mapper/user.mapper';
import { InjectRepository } from '@nestjs/typeorm';
import { Inject, Logger } from '@nestjs/common';
import { ROLE_REPOSITORY } from '../../di/role.di-tokens';
import { RoleRepository } from './role.repository';
import { UserRoleEntity } from '../entities/user-role.entity';
import { GetListUsersQuery } from '../../../application/user/query/get-list-users/get-list-users.query';

export class UserRepository implements UserRepositoryPort {
  private readonly logger = new Logger(UserRepository.name);

  constructor(
    @InjectRepository(UserEntity as any)
    private readonly userRepository: Repository<UserEntity>,
    @Inject(ROLE_REPOSITORY)
    private readonly roleRepository: RoleRepository,
  ) {}

  async createUser(entity: User): Promise<void> {
    this.logger.log('Creating user with data: ', entity);
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
    this.logger.log('User created successfully with ID: ', user.id);
  }

  async findByEmail(email: string): Promise<UserEntity> {
    this.logger.log('Finding user by email: ', email);
    const user = await this.userRepository.findOne({
      where: { email },
      relations: ['userRoles', 'userRoles.role'],
    });
    this.logger.log('User found: ', user);
    return user;
  }

  async findOneById(id: string): Promise<UserEntity> {
    this.logger.log('Finding user by ID: ', id);
    const user = await this.userRepository.findOne({
      where: { id: id },
      relations: [
        'userRoles',
        'userRoles.role',
        'userRoles.role.rolePermissions',
        'userRoles.role.rolePermissions.permission',
      ],
    });
    this.logger.log('User found: ', user);
    return user;
  }

  async findAll(query: GetListUsersQuery): Promise<any> {
    this.logger.log('Finding all users with query: ', query);
    const { page, limit, sort, text } = query;
    const skip = (page - 1) * limit;

    // Build the query options
    const options: FindManyOptions<UserEntity> = {
      where: text
        ? [{ username: Like(`%${text}%`) }, { email: Like(`%${text}%`) }]
        : {},
      order: sort,
      skip: skip,
      take: limit,
    };

    const [data, count] = await this.userRepository.findAndCount(options);
    this.logger.log('Users found: ', { data, count });
    return { data, count };
  }
}
