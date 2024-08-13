import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {CreateUserCommand} from "./create-user.command";
import {UserEntity} from "../../../../domain/entities/user.entity";
import {UserRepositoryPort} from "../../user.repository.port";
import {Err, Ok, Result} from "oxide.ts";
import {ConflictException, Inject} from "@nestjs/common";
import {UserAlreadyExistsException} from "../../../../domain/exceptions/user-exists.exception";
import {Id} from "../../../../domain/value-objects/id.vo";
import {USER_REPOSITORY} from "../../../../infrastructure/di/user.di-tokens";

@CommandHandler(CreateUserCommand)
export class CreateUserService implements ICommandHandler<CreateUserCommand> {
    constructor(
        @Inject(USER_REPOSITORY)
        private readonly userRepository: UserRepositoryPort) {
    }

    async execute(command: CreateUserCommand): Promise<Result<Id, UserAlreadyExistsException>> {
        const user = UserEntity.create(command);

        // Use transaction here to ensure that the user is saved to the database
        try {
            await this.userRepository.transaction(async () =>
                await this.userRepository.createUser(user));
            return Ok(user.getId())
        } catch (error: any) {
            if (error instanceof ConflictException) {
                return Err(new UserAlreadyExistsException(error));
            }
            throw error;
        }

    }
}