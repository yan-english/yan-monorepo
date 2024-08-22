
export class CreateRoleRequest {
    readonly name: string;
    readonly permissionIds: string[];
    readonly description: string;

    constructor(name: string, permissionIds: string[], description: string) {
        this.name = name;
        this.permissionIds = permissionIds;
        this.description = description;
    }
}