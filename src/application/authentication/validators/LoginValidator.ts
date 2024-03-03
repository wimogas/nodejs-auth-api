import AuthValidator from "./AuthValidator";

export class LoginValidator extends AuthValidator{
    public validate(request: any): string {

        if (!request.email) {
            return "Email is required"
        } else if (!this.isValidEmail(request.email)) {
            return "Email is not valid"
        }

        if (!request.password) {
            return "Password is required"
        }

        return ''
    }

}