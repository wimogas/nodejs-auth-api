import 'reflect-metadata'
import GetTokenQueryValidator
    from "../../../../src/authentication/application/queries/get-token/GetTokenQueryValidator";

describe("Login Validation Business Rules", () => {

    const validEmail = "user@mail.com"
    const validPassword = "9X8zMJ0XctMpo!"

    const loginValidator = new GetTokenQueryValidator()

    let mockData: any;

    beforeEach(() => {
        mockData = {
            email: validEmail,
            password: validPassword
        }
    })

    test("Data is valid", () => {
        const res = loginValidator.validate(mockData)
        expect(res).toBe(undefined)
    });

    test("User Email is missing", () => {
        mockData.email = ""
        const res = loginValidator.validate(mockData)
        expect(res).toEqual({
            status: 400,
            title: "Your request parameters didn't validate.",
            "invalid-params": {
                name: "email",
                reason: "Email is required"
            }
        })
    });

    test("User Email is not valid", () => {
        mockData.email = "usermailcom"
        const res = loginValidator.validate(mockData)
        expect(res).toEqual({
            status: 400,
            title: "Your request parameters didn't validate.",
            "invalid-params": {
                name: "email",
                reason: "Email is not valid"
            }
        })
    });

    test("User Password is missing", () => {
        mockData.password = ""
        const res = loginValidator.validate(mockData)
        expect(res).toEqual({
            status: 400,
            title: "Your request parameters didn't validate.",
            "invalid-params": {
                name: "password",
                reason: "Password is required"
            }
        })
    });

});
