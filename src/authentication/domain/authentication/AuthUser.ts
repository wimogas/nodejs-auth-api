import {AggregateRoot} from "../models/AggregateRoot";
import {AuthUserId} from "./ValueObjects/AuthUserId";

export class AuthUser extends AggregateRoot<AuthUserId> {
    public email: string;
    public password: string;
    private constructor(id: AuthUserId, email: string, password: string) {
        super(id);
        this.email = email
        this.password = password
    }

    public static create(id: string, email: string, password: string): AuthUser {
        return new AuthUser(
            AuthUserId.create(id),
            email,
            password
        )
    }
}