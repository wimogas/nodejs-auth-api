export class CreateUserCommand {
    private readonly _email: string
    private readonly _password: string
    private readonly _role?: string

    public constructor(
        email: string,
        password: string,
        role?: string) {
        this._email = email
        this._password = password
        this._role = role
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