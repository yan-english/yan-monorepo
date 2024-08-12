import { AggregateRoot } from '../../../../commons/ddd/aggregate-root.base';
import { CreateUserProps, UserProps } from '../../application/user/user.types';
import { AggregateID } from '../../../../commons/ddd/entity.base';
import { randomUUID } from 'crypto';

export class UserEntity extends AggregateRoot<UserProps> {
  protected _id: AggregateID;

  static create(create: CreateUserProps): UserEntity {
    // Need to use snowflake instead of UUID here
    const id = randomUUID();
    /* Setting a default role since we are not accepting it during creation. */
    const props: UserProps = { ...create, role: 'user' };

    // We can publish an event here to notify that a user has been created
    return new UserEntity({ id, props });
  }

  validate(): void {
    // entity business rules validation to protect it's invariant before saving entity to a database
  }
}
