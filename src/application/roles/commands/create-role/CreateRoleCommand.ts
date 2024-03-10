export class CreateRoleCommand {
    private readonly _name: string

    public constructor(name: string) {
        this._name = name
    }

    get name(): string {
        return this._name;
    }
}