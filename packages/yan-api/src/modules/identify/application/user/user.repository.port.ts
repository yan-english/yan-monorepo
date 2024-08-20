import { User } from '../../domain/entities/user';
import { RepositoryPort } from '../../../../commons/ddd/repository.port';
import { UserEntity } from '../../infrastructure/database/entities/user.entity';

export interface UserRepositoryPort extends RepositoryPort<User> {
  createUser(user: User): Promise<void>;

  findByEmail(email: string): Promise<UserEntity>;
}
