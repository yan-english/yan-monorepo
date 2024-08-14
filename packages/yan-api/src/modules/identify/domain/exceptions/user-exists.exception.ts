import {ExceptionBase} from "../../../../commons/exceptions/exception.base";

export class UserAlreadyExistsException extends ExceptionBase {
    public readonly code = 'USER_ALREADY_EXISTS';
    static readonly message = 'UserEntity already exists';
    constructor(cause?: Error, metadata?: unknown) {
        super(UserAlreadyExistsException.message, cause, metadata);
    }
}