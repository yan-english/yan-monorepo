import { ExceptionBase } from '../../../../commons/exceptions/exception.base';

export class UserAlreadyExistsException extends ExceptionBase {
  static readonly message = 'UserEntity already exists';
  public readonly code = 'USER_ALREADY_EXISTS';

  constructor(cause?: Error, metadata?: unknown) {
    super(UserAlreadyExistsException.message, cause, metadata);
  }
}
