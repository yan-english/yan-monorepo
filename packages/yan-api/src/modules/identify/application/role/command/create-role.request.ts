
export class CreateRoleRequest {
    readonly name: string;
    readonly permissionIds: number[];
    readonly description: string;

    constructor(name: string, permissionIds: number[], description: string) {
        this.name = name;
        this.permissionIds = permissionIds;
        this.description = description;
    }
}