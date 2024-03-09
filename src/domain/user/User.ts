import {AggregateRoot} from "../common/AggregateRoot";
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
        const id = UserId.create(data.id)
        const email = Email.create(data.email)
        const password = await Password.create(data.password)
        return new User(
            id,
            email,
            password
        )
    }
}