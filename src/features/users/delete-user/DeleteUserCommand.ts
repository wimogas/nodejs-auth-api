export class DeleteUserCommand {
    private readonly _id: string
    private readonly _token: string

    public constructor(
        id: string,
        token: string) {
        this._id = id
        this._token = token

    }

    get id(): string {
        return this._id;
    }
    get token(): string {
        return this._token;
    }
}