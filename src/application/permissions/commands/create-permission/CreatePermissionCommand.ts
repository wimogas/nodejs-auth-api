export class CreatePermissionCommand {
    private readonly _name: any

    public constructor(name: any) {
        this._name = name
    }

    get name(): any {
        return this._name;
    }
}