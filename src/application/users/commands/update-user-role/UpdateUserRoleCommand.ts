export class UpdateUserRoleCommand {
    private readonly _id: string
    private readonly _role?: string

    public constructor(
        id: string,
        role?: string) {
        this._id = id

        this._role = role
    }

    get id(): string {
        return this._id;
    }

    get role(): string {
        return this._role;
    }
}