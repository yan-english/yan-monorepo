import { User } from '../../domain/entities/user';
import { RepositoryPort } from '../../../../commons/ddd/repository.port';
import { UserEntity } from '../../infrastructure/database/entities/user.entity';
import { GetListUsersQuery } from './query/get-list-users/get-list-users.query';

export interface UserRepositoryPort extends RepositoryPort<User> {
  createUser(user: User): Promise<void>;

  findByEmail(email: string): Promise<UserEntity>;

  findOneById(id: string): Promise<UserEntity>;

  findAll(query: GetListUsersQuery): Promise<any>;
}
