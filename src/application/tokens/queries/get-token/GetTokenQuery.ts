export class GetTokenQuery {
    private readonly _email: string
    private readonly _password: string

    public constructor(
        email: string,
        password: string) {
        this._email = email
        this._password = password
    }

    get password(): string {
        return this._password;
    }
    get email(): string {
        return this._email;
    }
}