import {RegisterValidator} from "../../../src/application/authentication/validators/RegisterValidator";
import {IHTTPRequest} from "../../../src/infrastructure/web/frameworks/express/inputs/interfaces/IHTTPRequest";
import {LoginValidator} from "../../../src/application/authentication/validators/LoginValidator";

describe("Login Validation Business Rules", () => {

    const validEmail = "user@mail.com"
    const validPassword = "9X8zMJ0XctMpo!"

    const loginValidator = new LoginValidator()

    let mockData: IHTTPRequest;

    beforeEach(() => {
        mockData = {
            query: null,
            body: {
                email: validEmail,
                password: validPassword
            },
            params: null,
            headers: null
        };
    })

    test("Data is valid", () => {
        const res = loginValidator.validate(mockData)
        expect(res).toEqual("")
    });

    test("User Email is missing", () => {
        mockData.body.email = ""
        const res = loginValidator.validate(mockData)
        expect(res).toEqual("Email is required")
    });

    test("User Email is not valid", () => {
        mockData.body.email = "usermailcom"
        const res = loginValidator.validate(mockData)
        expect(res).toEqual("Email is not valid")
    });

    test("User Password is missing", () => {
        mockData.body.password = ""
        const res = loginValidator.validate(mockData)
        expect(res).toEqual("Password is required")
    });

});
