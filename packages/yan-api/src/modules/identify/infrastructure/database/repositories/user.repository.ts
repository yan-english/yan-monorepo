import {Repository} from "typeorm";
import {UserRepositoryPort} from "../../../application/user/user.repository.port";
import {UserEntity} from "../../../domain/entities/user.entity";
import {Paginated, PaginatedQueryParams} from "../../../../../commons/ddd/repository.port";
import {User} from "../entities/user";
import {UserMapper} from "../../../mapper/user.mapper";

export class UserRepository extends Repository<User> implements UserRepositoryPort {
    private readonly mapper: UserMapper;

    async createUser(entity: UserEntity): Promise<void> {
        const user: User = this.mapper.toPersistence(entity);
        await this.save(user);
    }

    transaction<T>(handler: () => Promise<T>): Promise<T> {
        //TODO
        return Promise.resolve(undefined);
    }

}