import {AggregateRoot} from "../models/AggregateRoot";
import {UserId} from "./ValueObjects/UserId";

export class User extends AggregateRoot<UserId> {
    public name: string;
    public email: string;
    public password: string;
    private constructor(id: UserId, name: string, email: string, password: string) {
        super(id);
        this.name = name
        this.email = email
        this.password = password
    }

    public static create(id: string, name: string, email: string, password: string): User {
        return new User(
            UserId.create(id),
            name,
            email,
            password
        )
    }
}