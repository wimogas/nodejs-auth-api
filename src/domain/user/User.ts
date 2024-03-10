import {AggregateRoot} from "../common/AggregateRoot";
import {UserId} from "./fields/UserId";
import {Email} from "./fields/Email";
import {Password} from "./fields/Password";
import {RoleAttribute} from "../../security";
import {Permission} from "../permission/Permission";
import {Role} from "../role/Role";
import {RoleId} from "../role/RoleId";

export class User extends AggregateRoot<UserId> {
    public email: Email;
    public password: Password;
    public role: RoleId;

    private constructor(
        id: UserId,
        email: Email,
        password: Password,
        role: RoleId) {
        super(id);
        this.email = email
        this.password = password
        this.role = role
    }

    public static async create(data: any): Promise<User> {

        const id = UserId.create(data.id)
        const email = Email.create(data.email)
        const password = await Password.create(data.password)

        const role = RoleId.create(data.role)

        return new User(
            id,
            email,
            password,
            role
        )
    }
}