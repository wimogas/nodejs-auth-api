import {Email} from "../../../src/users/domain/Email";
import {InvalidEmailError} from "../../../src/users/domain/Errors/InvalidEmailError";

describe("Email Class", () => {

    test("Email are equal", () => {
        const Id1 = Email.create("1@mail.com");
        const Id2 = Email.create("1@mail.com");

        expect(Id1).toEqual(Id2);
        expect(Id1.equals(Id2)).toBe(true);

    });

    test("Email are not equal", () => {
        const Id1 = Email.create("1@mail.com");
        const Id2 = Email.create("2@mail.com");

        const equalize = Id1 === Id2

        expect(equalize).toBe(false);
        expect(Id1.equals(Id2)).toBe(false);

    });

    test("Email return the correct data", () => {
        const id = Email.create("1@mail.com");
        expect(id.value).toBe("1@mail.com");

    });

    test("Email is valid", () => {
        expect(
            () => Email.create("1"))
            .toThrow(InvalidEmailError);
    });
});