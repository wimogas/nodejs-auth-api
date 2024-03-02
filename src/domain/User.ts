import Entity from "./interfaces/Entity";

interface IUser {
    name: string,
    email: string,
    password: string
}

export default class User extends Entity {

    public constructor(data: IUser, id: string) {
        super(data, id)
    }

    public static create(data: IUser, id: string): User {
        return new User({
            name: data.name,
            email: data.email,
            password: data.password
            }, id)
    }

    get getName(): string {
        return this.data.name
    }

    get getEmail(): string {
        return this.data.email
    }

    get getPassword(): string {
        return this.data.password
    }

}