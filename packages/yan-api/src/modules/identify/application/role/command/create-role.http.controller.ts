import {Controller, Post} from "@nestjs/common";
import {CommandBus} from "@nestjs/cqrs";

@Controller('roles')
export class CreateRoleHttpController {
    constructor(private readonly commandBus: CommandBus) {}

    @Post()
    async createRole(): Promise<void> {

    }

}