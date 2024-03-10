export class GetPermissionQuery {
    private readonly _id: any

    public constructor(id: string) {
        this._id = id
    }

    get id(): any {
        return this._id;
    }
}