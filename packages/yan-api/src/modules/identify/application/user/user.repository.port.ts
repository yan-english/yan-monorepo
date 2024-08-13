import {UserEntity} from "../../domain/entities/user.entity";
import {RepositoryPort} from "../../../../commons/ddd/repository.port";

export interface UserRepositoryPort extends RepositoryPort<UserEntity>{

    createUser(user: UserEntity): Promise<void>;

}