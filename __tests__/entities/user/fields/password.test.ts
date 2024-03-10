import {BcryptCryptoService} from "../../../../src/services/BcryptCryptoService";
import {Password} from "../../../../src/domain/user";

describe("Password Class", () => {

    const cryptoService = new BcryptCryptoService()

    test("Password are not equal", async () => {
        const [pwd1, pwd2] = await Promise.all([Password.create("9X8zMJ0XctMpo!"), Password.create("9X8zMJ0DDctMpo!")]);

        const equalize = pwd1 === pwd2

        expect(equalize).toBe(false);
        expect(pwd1.equals(pwd2)).toBe(false);

    });

    test("Password return the correct data", async () => {
        const pwd1 = await Password.create("9X8zMJ0DDctMpo!");
        const passwordToCompare = "9X8zMJ0DDctMpo!"
        expect(await cryptoService.handleCompare(passwordToCompare, pwd1.value)).toBe(true);

    });

    test("Password is Missing", async () => {
        await expect(async () => await Password.create(""))
            .rejects.toThrow("Password is required");

    });

    test("Password is Missing", async () => {
        await expect(async () => await Password.create("123123123"))
            .rejects.toThrow("Password must be at least 6 characters and contain at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 symbol");

    });

    test("Password can be hashed and verified", async () => {
        const pwd1 = await Password.create("9X8zMJ0DDctMpo!");
        const passwordToCompare = "9X8zMJ0DDctMpo!"
        expect(await pwd1.verify(passwordToCompare)).toBe(true);
    });
});