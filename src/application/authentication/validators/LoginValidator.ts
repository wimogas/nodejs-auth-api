import AuthValidator from "./AuthValidator";

export class LoginValidator extends AuthValidator{
    public validate(request: any): any {

        let error = {};

        if (!request.email) {
            error["name"] = "email"
            error["reason"] = "Email is required"
            return error
        } else if (!this.isValidEmail(request.email)) {
            error["name"] = "email"
            error["reason"] = "Email is not valid"
            return error
        }

        if (!request.password) {
            error["name"] = "email"
            error["reason"] = "Email is required"
            return error
        }
    }
}