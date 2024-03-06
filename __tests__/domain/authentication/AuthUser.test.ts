import {AuthUser} from "../../../src/domain/authentication/AuthUser";

describe("User Class", () => {

    test("Users are equal", () => {
        const User1 = AuthUser.create(
            "1",
            "email@email.com",
            "123123");
        const User2 = AuthUser.create(
            "1",
            "email@email.com",
            "123123");

        expect(User1.equals(User2)).toBe(true);

    });

    test("Users are not equal", () => {
        const User1 = AuthUser.create(
            "1",
            "email@email.com",
            "123123");
        const User2 = AuthUser.create(
            "2",
            "email@email.com",
            "123123");

        expect(User1.equals(User2)).toBe(false);

    });

    test("User return the correct data", () => {
        const User1 = AuthUser.create(
            "1",
            "email@email.com",
            "123123");
        console.log(User1)
        expect(User1.id.value).toBe("1");
        expect(User1.email).toBe("email@email.com");
        expect(User1.password).toBe("123123");
    });
});