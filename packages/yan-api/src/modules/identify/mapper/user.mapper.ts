import {Mapper} from "../../../commons/ddd/mapper.interface";
import {UserEntity} from "../domain/entities/user.entity";
import {User} from "../infrastructure/database/entities/user";
import {Username} from "../domain/value-objects/username.vo";
import {Email} from "../domain/value-objects/email.vo";
import {Password} from "../domain/value-objects/password.vo";
import {Id} from "../domain/value-objects/id.vo";

export class UserMapper implements Mapper<UserEntity, User> {
     toDomain(record: User): UserEntity {
        return new UserEntity(
            new Id(record.id),
            new Username(record.username),
            new Password(record.password)
        )
    }

toPersistence(entity: UserEntity): User {
    return {
        id: entity.getId().getValue(),
        username: entity.getUsername().getValue(),
        password: entity.getPassword().getValue(),
        email: entity.getEmail().getValue(),
    };
}

    toResponse(entity: UserEntity): any {
        return undefined;
    }

}