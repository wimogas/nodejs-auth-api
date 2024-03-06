import {Entity} from "../../../src/domain/models/Entity";
import {UserId} from "../../../src/domain/authentication/ValueObjects/UserId";

class UserAsEntity extends Entity<UserId> {
    public name: string;
    public email: string;
    public password: string;
    private constructor(id: UserId, name: string, email: string, password: string) {
        super(id);
        this.name = name
        this.email = email
        this.password = password
    }

    public static create(id: string, name: string, email: string, password: string): UserAsEntity {
        return new UserAsEntity(
            UserId.create(id),
            name,
            email,
            password
        )
    }
}

describe("Entity Class", () => {

    test("Entities are equal", () => {
        const UserAsEntity1 = UserAsEntity.create(
            "1",
            "name1",
            "email@email.com",
            "123123");
        const UserAsEntity2 = UserAsEntity.create(
            "1",
            "name1",
            "email@email.com",
            "123123");

        expect(UserAsEntity1.equals(UserAsEntity2)).toBe(true);

    });

    test("Entities are not equal", () => {
        const UserAsEntity1 = UserAsEntity.create(
            "1",
            "name1",
            "email@email.com",
            "123123");
        const UserAsEntity2 = UserAsEntity.create(
            "2",
            "name1",
            "email@email.com",
            "123123");

        expect(UserAsEntity1.equals(UserAsEntity2)).toBe(false);

    });

    test("Entities return the correct data", () => {
        const UserAsEntity1 = UserAsEntity.create(
            "1",
            "name1",
            "email@email.com",
            "123123");
        console.log(UserAsEntity1)
        expect(UserAsEntity1.id.value).toBe("1");
        expect(UserAsEntity1.name).toBe("name1");
        expect(UserAsEntity1.email).toBe("email@email.com");
        expect(UserAsEntity1.password).toBe("123123");
    });
});