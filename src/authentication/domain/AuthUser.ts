import {AggregateRoot} from "../../common/domain/models/AggregateRoot";
import {AuthUserId} from "./ValueObjects/AuthUserId";

export class AuthUser extends AggregateRoot<AuthUserId> {
    public email: string;
    public password: string;
    public permissions: string;
    public roles: string;

    private constructor(
        id: AuthUserId,
        email: string,
        password: string,
        permissions: string,
        roles: string) {
        super(id);
        this.email = email
        this.password = password
        this.permissions = permissions
        this.roles = roles
    }

    public static create(
        id: string,
        email: string,
        password: string,
        permissions: string = "",
        roles: string = ""): AuthUser {
        return new AuthUser(
            AuthUserId.create(id),
            email,
            password,
            permissions,
            roles
        )
    }
}