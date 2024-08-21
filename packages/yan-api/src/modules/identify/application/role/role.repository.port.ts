import {RepositoryPort} from "../../../../commons/ddd/repository.port";
import {Role} from "../../domain/entities/role";

export interface RoleRepositoryPort extends RepositoryPort<Role> {
    createRole(role: Role): Promise<void>;
    findByName(name: string): Promise<Role>;
}