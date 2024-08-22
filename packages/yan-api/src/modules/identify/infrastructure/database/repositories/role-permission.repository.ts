import {InjectRepository} from "@nestjs/typeorm";
import {PermissionEntity} from "../entities/permission.entity";
import {Repository} from "typeorm";
import {RolePermissionEntity} from "../entities/role-permission.entity";

export class RolePermissionRepository {
    constructor(
        @InjectRepository(RolePermissionEntity as any)
        private readonly rolePermissionRepository: Repository<RolePermissionEntity>,
    ) {}

}