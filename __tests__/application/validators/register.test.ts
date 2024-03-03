import {RegisterValidator} from "../../../src/application/authentication/validators/RegisterValidator";
import {IHTTPRequest} from "../../../src/infrastructure/web/frameworks/express/inputs/interfaces/IHTTPRequest";

describe("Register Validation Business Rules", () => {

    const validName = "User"
    const validEmail = "user@mail.com"
    const validPassword = "9X8zMJ0XctMpo!"

    const registerValidator = new RegisterValidator()

    let mockData: IHTTPRequest;

    beforeEach(() => {
        mockData = {
            query: null,
            body: {
                name: validName,
                email: validEmail,
                password: validPassword
            },
            params: null,
            headers: null
        };
    })

    test("User is valid", () => {
        const res = registerValidator.validate(mockData)
        expect(res).toEqual("")
    });

    test("User Name is missing", () => {
        mockData.body.name = ""
        const res = registerValidator.validate(mockData)
        expect(res).toEqual("Name is required")
    });

    test("User Email is missing", () => {
        mockData.body.email = ""
        const res = registerValidator.validate(mockData)
        expect(res).toEqual("Email is required")
    });

    test("User Email is not valid", () => {
        mockData.body.email = "usermailcom"
        const res = registerValidator.validate(mockData)
        expect(res).toEqual("Email is not valid")
    });

    test("User Password is missing", () => {
        mockData.body.password = ""
        const res = registerValidator.validate(mockData)
        expect(res).toEqual("Password is required")
    });

    test("User Password is not valid", () => {
        mockData.body.password = "123123"
        const res = registerValidator.validate(mockData)
        expect(res).toEqual("Password must be at least 6 characters and contain at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 symbol")
    });
});
