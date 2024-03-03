import AuthValidator from "./AuthValidator";

export class LoginValidator extends AuthValidator{
    public validate(request: any): string {

        let validation: string

        if (!request.email) {
            validation = "Email is required"
        } else if (!this.isValidEmail(request.email)) {
            validation = "Email is not valid"
        }

        if (!request.password) {
            validation = "Password is required"
        }

        return validation
    }

}