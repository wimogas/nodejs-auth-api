export class UpdateRoleCommand {
    private readonly _permission: any
    private readonly _id: any

    public constructor(
        id: string,
        permission: any,) {
        this._permission = permission
        this._id = id
    }

    get permission(): any {
        return this._permission;
    }
    get id(): any {
        return this._id;
    }
}