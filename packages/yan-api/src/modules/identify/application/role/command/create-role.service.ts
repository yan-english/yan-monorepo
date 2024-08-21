import {CreateRoleCommand} from "./create-role.command";
import {Role} from "../../../domain/entities/role";
import {RoleRepositoryPort} from "../role.repository.port";

export class CreateRoleService {
    constructor(private readonly roleRepository: RoleRepositoryPort) {}

    async execute(command: CreateRoleCommand) {
        const role = Role.create(command.name, command.description, command.permissionIds);
        return await this.roleRepository.createRole(role);
    }
}