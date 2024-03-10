
export class SeedAuthCommand {
    private readonly _permissions: any
    private readonly _roles: any

    public constructor(
        permissions: any,
        roles: any) {
        this._permissions = permissions
        this._roles = roles
    }

    get permissions(): any {
        return this._permissions;
    }
    get roles(): any {
        return this._roles;
    }
}