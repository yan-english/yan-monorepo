import { Mapper } from '../../../commons/ddd/mapper.interface';
import { User } from '../domain/entities/user';
import { UserEntity } from '../infrastructure/database/entities/user.entity';
import { Email } from '../domain/value-objects/email.vo';
import { Password } from '../domain/value-objects/password.vo';
import { Id } from '../domain/value-objects/id.vo';
import { GetUserInfoResponseDto } from '../application/user/query/get-user-info/get-user-info.response.dto';

export class UserMapper implements Mapper<User, UserEntity> {
  toDomain(record: UserEntity): User {
    return new User(
      new Id(record.id),
      new Email(record.email),
      new Password(record.password, record.salt),
      [],
    );
  }

  toPersistence(entity: User): UserEntity {
    return {
      id: entity.getId().getValue(),
      username: null,
      password: entity.getPassword().getHashedPassword(),
      email: entity.getEmail().getValue(),
      dateOfBirth: null,
      gender: null,
      userRoles: null,
      salt: entity.getPassword().getSalt(),
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  toResponse(entity: User) {
    return undefined;
  }

  toResponseUserInfo(entity: UserEntity): GetUserInfoResponseDto {
    const listRoles = entity.userRoles.map((role) => role.role.name);
    const listPermissions = entity.userRoles.map((role) =>
      role.role.rolePermissions.map(
        (rolePermission) => rolePermission.permission,
      ),
    );
    return {
      id: entity.id,
      username: entity.username,
      email: entity.email,
      dateOfBirth: entity.dateOfBirth,
      gender: entity.gender,
      listPermissions: listPermissions,
      listRoles: listRoles,
    };
  }

  toResponseListUsers(entities: UserEntity[]): any {
    return entities.map((entity) => {
      return {
        id: entity.id,
        email: entity.email,
        username: entity.username,
        dateOfBirth: entity.dateOfBirth,
        gender: entity.gender,
        listPermissions: [],
        listRoles: [],
      };
    });
  }
}
