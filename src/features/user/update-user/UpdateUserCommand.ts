export class UpdateUserCommand {
    private readonly _id: string
    private readonly _email: string
    private readonly _password: string

    public constructor(
        id: string,
        email: string,
        password: string) {
        this._id = id
        this._email = email
        this._password = password
    }

    get id(): string {
        return this._id;
    }

    get password(): string {
        return this._password;
    }
    get email(): string {
        return this._email;
    }
}