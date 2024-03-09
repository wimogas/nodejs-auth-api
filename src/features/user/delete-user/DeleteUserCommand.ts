export class DeleteUserCommand {
    private readonly _id: string
    private readonly _user: any

    public constructor(
        id: string,
        user: any) {
        this._id = id
        this._user = user

    }

    get id(): string {
        return this._id;
    }
    get token(): any {
        return this._user;
    }
}