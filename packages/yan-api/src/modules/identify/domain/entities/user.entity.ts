import { AggregateRoot } from '../../../../commons/ddd/aggregate-root.base';
import { CreateUserProps, UserProps } from '../../application/user/user.types';
import { randomUUID } from 'crypto';
import {Id} from "../value-objects/id.vo";
import {Username} from "../value-objects/username.vo";
import {Password} from "../value-objects/password.vo";
import {CreateUserCommand} from "../../application/user/command/create-user/create-user.command";
import {Email} from "../value-objects/email.vo";

export class UserEntity extends AggregateRoot<Id> {

    constructor(id: Id, username: Username, password: Password) {
      super();
      this.username = username;
      this.password = password;
    }


  private readonly username: Username;
  private readonly password: Password;
  private readonly email: Email;

  public getEmail(): Email {
    return this.email;
  }

  public getUsername(): Username {
    return this.username;
  }

  public getPassword(): Password {
    return this.password;
  }

  static create(create: CreateUserCommand): UserEntity {

    // Need to use snowflake instead of UUID here
    const id = new Id(randomUUID());
    const username = new Username(create.username);
    const password = new Password(create.password);

    // We can publish an event here to notify that a user has been created
    return new UserEntity(id, username, password);

  }

  validate(): void {
    // entity business rules validation to protect it's invariant before saving entity to a database
  }
}
