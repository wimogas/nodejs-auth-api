export class UpdateRoleCommand {
    private readonly _changes: any
    private readonly _id: any

    public constructor(
        id: string,
        changes: any,) {
        this._changes = changes
        this._id = id
    }

    get changes(): any {
        return this._changes;
    }
    get id(): any {
        return this._id;
    }
}