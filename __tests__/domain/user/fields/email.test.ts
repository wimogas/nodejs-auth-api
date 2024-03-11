import {Email} from "../../../../src/domain/user";
import {InvalidEmailError} from "../../../../src/domain/user/errors/InvalidEmailError";

describe("Email Class", () => {

    test("Email are equal", () => {
        const email1 = Email.create("1@mail.com");
        const email2 = Email.create("1@mail.com");

        expect(email1).toEqual(email2);
        expect(email1.equals(email2)).toBe(true);

    });

    test("Email are not equal", () => {
        const email1 = Email.create("1@mail.com");
        const email2 = Email.create("2@mail.com");

        const equalize = email1 === email2

        expect(equalize).toBe(false);
        expect(email1.equals(email2)).toBe(false);

    });

    test("Email return the correct data", () => {
        const email = Email.create("useasddaas2dr123@mail.com");
        expect(email.value).toBe("useasddaas2dr123@mail.com");

    });

    test("Email is NOT valid", () => {
        expect(
            () => Email.create("1"))
            .toThrow(InvalidEmailError);
    });
});