export class UpdatePermissionCommand {
    private readonly _name: string
    private readonly _id: string

    public constructor(
        id: string,
        name: string) {
        this._name = name
        this._id = id
    }

    get name(): string {
        return this._name;
    }
    get id(): string {
        return this._id;
    }
}