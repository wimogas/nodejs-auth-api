import {AggregateRoot} from "../common/AggregateRoot";
import {UserId} from "./fields/UserId";
import {Email} from "./fields/Email";
import {Password} from "./fields/Password";
import {Role} from "../auth/Role";
import {RoleAttribute} from "../../security";

export class User extends AggregateRoot<UserId> {
    public email: Email;
    public password: Password;
    public role: Role;

    private constructor(
        id: UserId,
        email: Email,
        password: Password,
        role: Role) {
        super(id);
        this.email = email
        this.password = password
        this.role = role
    }

    public static async create(data: any): Promise<User> {
        const id = UserId.create(data.id)
        const email = Email.create(data.email)
        const password = await Password.create(data.password)
        const role = Role.create({
            name: data.role ? data.role : RoleAttribute.User
        })
        return new User(
            id,
            email,
            password,
            role
        )
    }
}