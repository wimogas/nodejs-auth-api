export class UpdateUserCommand {
    private readonly _id: string
    private readonly _email: string
    private readonly _password: string
    private readonly _role?: string

    public constructor(
        id: string,
        email: string,
        password: string,
        role?: string) {
        this._id = id
        this._email = email
        this._password = password
        this._role = role
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
    get role(): string {
        return this._role;
    }
}