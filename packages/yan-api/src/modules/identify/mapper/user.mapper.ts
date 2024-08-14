import {Mapper} from "../../../commons/ddd/mapper.interface";
import {User} from "../domain/entities/user";
import {UserEntity} from "../infrastructure/database/entities/user.entity";
import {Username} from "../domain/value-objects/username.vo";
import {Email} from "../domain/value-objects/email.vo";
import {Password} from "../domain/value-objects/password.vo";
import {Id} from "../domain/value-objects/id.vo";

export class UserMapper implements Mapper<User, UserEntity> {
    toDomain(record: UserEntity): User {
        return new User(
            new Id(record.id),
            new Email(record.email),
            new Password(record.password)
        )
    }

    toPersistence(entity: User): UserEntity {
        return {
            id: entity.getId().getValue(),
            username: null,
            password: entity.getPassword().getValue(),
            email: entity.getEmail().getValue(),
            dateOfBirth: null,
            gender: null,
            userRoles: null
        };
    }

    toResponse(entity: User) {
        return undefined;
    }

}