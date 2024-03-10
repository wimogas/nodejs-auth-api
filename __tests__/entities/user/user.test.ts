import {BcryptCryptoService} from "../../../src/services/BcryptCryptoService";
import {User} from "../../../src/domain/user";
import {MissingEmailError} from "../../../src/domain/user/errors/MissingEmailError";
import {InvalidEmailError} from "../../../src/domain/user/errors/InvalidEmailError";
import {MissingPasswordError} from "../../../src/domain/user/errors/MissingPasswordError";
import {InvalidPasswordError} from "../../../src/domain/user/errors/InvalidPasswordError";

describe("User Class", () => {

    const cryptService = new BcryptCryptoService()
    let data1, data2

    beforeEach(() => {
        data1 = {
            id: "123",
            email: "email@email.com",
            password: "9X8zMJ0XctMpo!"
        }
        data2 = {
            id: "123",
            email: "email@email.com",
            password: "9X8zMJ0XctMpo!"
        }
    })


    test("User are equal", async () => {
        const user1 = await User.create(data1);
        const user2 = await User.create(data2);

        expect(user1.equals(user2)).toBe(true);

    });

    test("User are not equal", async () => {
        const Id1 = await User.create(data1);
        data2.id = "123123"
        const Id2 = await User.create(data2);

        const equalize = Id1 === Id2

        expect(equalize).toBe(false);
        expect(Id1.equals(Id2)).toBe(false);

    });

    test("User return the correct data", async () => {
        const user = await User.create(data1);
        expect(user.id.value).toBe("123");
        expect(user.email.value).toBe("email@email.com");
        expect(await cryptService.handleCompare("9X8zMJ0XctMpo!", user.password.value)).toBe(true)

    });
    test("User id is generated", async () => {
        data1.id = ""
        const user = await User.create(data1);
        expect(user.id.value.length).toBeGreaterThan(0);

    });

    test("User validates email", async () => {
        data1.email = ""
        await expect(
            async () => await User.create(data1))
            .rejects
            .toThrow(MissingEmailError)
    });

    test("User validates email", async () => {
        data1.email = "email"
        await expect(
            async () => await User.create(data1))
            .rejects
            .toThrow(InvalidEmailError)
    });

    test("User validates password", async () => {
        data1.password = ""
        await expect(
            async () => await User.create(data1))
            .rejects
            .toThrow(MissingPasswordError)
    });

    test("User validates password", async () => {
        data1.password = "123123"
        await expect(
            async () => await User.create(data1))
            .rejects
            .toThrow(InvalidPasswordError)
    });
});