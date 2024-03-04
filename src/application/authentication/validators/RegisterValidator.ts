import AuthValidator from "./AuthValidator";

export class RegisterValidator extends AuthValidator {
    public validate(request: any): any {

        let error = {}

        if (!request.name) {
            error["name"] = "name"
            error["reason"] = "Name is required"
            return error
        }

        if (!request.email) {
            error["name"] = "email"
            error["reason"] = "Email is required"
            return error
        } else if (!this.isValidEmail(request.email)) {
            error["name"] = "email"
            error["reason"] = "Email is required"
            return error
        }

        if (!request.password) {
            error["name"] = "password"
            error["reason"] = "Password is required"
            return error
        } else if (!this.isValidPassword(request.password)) {
            error["name"] = "password"
            error["reason"] = "Password must be at least 6 characters and contain at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 symbol"
            return error
        }
    }

    private isValidPassword(password: string): boolean {
        const regex =  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W)[A-Za-z\d\W]{6,15}$/;
        return regex.test(password)
    }
}