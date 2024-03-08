import {AggregateRoot} from "../AggregateRoot";
import {UserId} from "./fields/UserId";
import {Email} from "./fields/Email";
import {Password} from "./fields/Password";

export class User extends AggregateRoot<UserId> {
    public email: Email;
    public password: Password;

    private constructor(
        id: UserId,
        email: Email,
        password: Password) {
        super(id);
        this.email = email
        this.password = password
    }

    public static async create(data: any): Promise<User> {
        return new User(
            UserId.create(data.id),
            Email.create(data.email),
            await Password.create(data.password)
        )
    }
}