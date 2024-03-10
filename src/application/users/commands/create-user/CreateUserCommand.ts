export class CreateUserCommand {
    private readonly _email: string
    private readonly _password: string
    private readonly _roleId?: string

    public constructor(
        email: string,
        password: string,
        roleId?: string) {
        this._email = email
        this._password = password
        this._roleId = roleId
    }

    get password(): string {
        return this._password;
    }
    get email(): string {
        return this._email;
    }

    get roleId(): string {
        return this._roleId;
    }
}