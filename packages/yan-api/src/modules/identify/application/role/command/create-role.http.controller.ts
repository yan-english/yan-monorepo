import {Body, Controller, Post} from "@nestjs/common";
import {CommandBus} from "@nestjs/cqrs";
import {CreateRoleCommand} from "./create-role.command";
import {CreateRoleRequest} from "./create-role.request";

@Controller('roles')
export class CreateRoleHttpController {
    constructor(private readonly commandBus: CommandBus) {}

    @Post()
    async createRole(@Body() createRoleRequest: CreateRoleRequest): Promise<string> {
        await this.commandBus.execute(new CreateRoleCommand(createRoleRequest))

        return "Role created successfully"
    }

}