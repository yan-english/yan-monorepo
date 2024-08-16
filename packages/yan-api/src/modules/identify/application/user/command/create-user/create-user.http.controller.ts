import {Body, ConflictException, Controller, Post} from "@nestjs/common";
import {CommandBus} from "@nestjs/cqrs";
import {CreateUserRequestDto} from "./create-user.request.dto";
import {CreateUserCommand} from "./create-user.command";
import {Err, match, Result} from "oxide.ts";
import {Id} from "../../../../domain/value-objects/id.vo";
import {UserAlreadyExistsException} from "../../../../domain/exceptions/user-exists.exception";

@Controller('users')
export class CreateUserHttpController {

    constructor(private readonly commandBus: CommandBus) {
    }

    @Post()
    async createUser(@Body() createUserRequestDto: CreateUserRequestDto): Promise<Id> {
        const result: Result<Id, UserAlreadyExistsException> =
            await this.commandBus.execute(new CreateUserCommand(createUserRequestDto));

        //Decide what to return based on the result (apply matching pattern)
        return match(result, {
            Ok: (id: Id) => {
                return id;
            },
            Err: (error): Id => {
                if (error instanceof UserAlreadyExistsException)
                    throw new ConflictException(error.message);
                throw error;
            }
        });
    }
}
