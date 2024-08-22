import { AggregateRoot } from '../../../../commons/ddd/aggregate-root.base';
import { randomUUID } from 'crypto';
import { Id } from '../value-objects/id.vo';
import { Username } from '../value-objects/username.vo';
import { Password } from '../value-objects/password.vo';
import { CreateUserCommand } from '../../application/user/command/create-user/create-user.command';
import { Email } from '../value-objects/email.vo';

export class User extends AggregateRoot<Id> {
  private readonly username: Username;
  private readonly password: Password;
  private readonly email: Email;
  private readonly roles: string[] = [];

  constructor(id: Id, email: Email, password: Password, roles: string[]) {
    super();
    this.id = id;
    this.email = email;
    this.password = password;
    this.roles = roles;
  }

  static create(create: CreateUserCommand): User {
    // Need to use snowflake instead of UUID here
    const id = new Id(randomUUID());
    const email = new Email(create.email);
    const password = new Password(create.password);
    const roles = create.roles;

    // We can publish an event here to notify that a user has been created
    return new User(id, email, password, roles);
  }

  public getEmail(): Email {
    return this.email;
  }

  public getRoles(): string[] {
    return this.roles;
  }
  public getUsername(): Username {
    return this.username;
  }

  public getPassword(): Password {
    return this.password;
  }

  verifyPassword(rawPassword: string): boolean {
    return this.password.verify(rawPassword);
  }

  validate(): void {
    // entity business rules validation to protect it's invariant before saving entity to a database
  }
}
