
export class DeletePermissionCommand {
    private readonly _id: any

    public constructor(id: any) {
        this._id = id
    }

    get id(): any {
        return this._id;
    }
}