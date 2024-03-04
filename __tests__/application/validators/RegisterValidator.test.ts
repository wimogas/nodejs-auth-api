import {RegisterValidator} from "../../../src/application/authentication/validators/RegisterValidator";

describe("Register Validation Business Rules", () => {

    const validName = "User"
    const validEmail = "user@mail.com"
    const validPassword = "9X8zMJ0XctMpo!"

    const registerValidator = new RegisterValidator()

    let mockData: any;

    beforeEach(() => {
        mockData = {
            name: validName,
            email: validEmail,
            password: validPassword
        };
    })

    test("User is valid", () => {
        const res = registerValidator.validate(mockData)
        expect(res).toBe('')
    });

    test("User Name is missing", () => {
        mockData.name = ""
        const res = registerValidator.validate(mockData)
        expect(res).toEqual("Name is required")
    });

    test("User Email is missing", () => {
        mockData.email = ""
        const res = registerValidator.validate(mockData)
        expect(res).toEqual("Email is required")
    });

    test("User Email is not valid", () => {
        mockData.email = "usermailcom"
        const res = registerValidator.validate(mockData)
        expect(res).toEqual("Email is not valid")
    });

    test("User Password is missing", () => {
        mockData.password = ""
        const res = registerValidator.validate(mockData)
        expect(res).toEqual("Password is required")
    });

    test("User Password is not valid", () => {
        mockData.password = "123123"
        const res = registerValidator.validate(mockData)
        expect(res).toEqual("Password must be at least 6 characters and contain at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 symbol")
    });
});
