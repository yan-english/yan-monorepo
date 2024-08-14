import {Repository} from "typeorm";
import {UserRepositoryPort} from "../../../application/user/user.repository.port";
import {User} from "../../../domain/entities/user";
import {UserEntity} from "../entities/user.entity";
import {UserMapper} from "../../../mapper/user.mapper";
import {InjectRepository} from "@nestjs/typeorm";
import {Inject} from "@nestjs/common";
import {USER_REPOSITORY} from "../../di/user.di-tokens";

export class UserRepository implements UserRepositoryPort {

    constructor(
        @InjectRepository(UserEntity as any)
        private readonly userRepository: Repository<UserEntity>,
    ) {}

    async createUser(entity: User): Promise<void> {
        const mapper = new UserMapper();
        const user: UserEntity = mapper.toPersistence(entity);
        await this.userRepository.save(user);
    }

    transaction<T>(handler: () => Promise<T>): Promise<T> {
        //TODO
        return Promise.resolve(undefined);
    }

}