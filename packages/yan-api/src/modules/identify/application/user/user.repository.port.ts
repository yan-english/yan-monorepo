import { User } from '../../domain/entities/user';
import { RepositoryPort } from '../../../../commons/ddd/repository.port';

export interface UserRepositoryPort extends RepositoryPort<User> {
  createUser(user: User): Promise<void>;
}
