export class DeleteRoleCommand {
    private readonly _id: string

    public constructor(id: string) {
        this._id = id
    }

    get id(): string {
        return this._id;
    }
}