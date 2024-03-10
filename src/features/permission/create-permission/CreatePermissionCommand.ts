
export class CreatePermissionCommand {
    private readonly _permissions: any

    public constructor(permissions: any) {
        this._permissions = permissions
    }

    get permissions(): any {
        return this._permissions;
    }
}