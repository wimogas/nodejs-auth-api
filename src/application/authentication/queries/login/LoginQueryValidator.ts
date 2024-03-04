import AuthValidator from "../../../common/validators/AuthValidator";
import {AuthErrors} from "../../../../domain/errors/AuthErrors";

export class LoginQueryValidator extends AuthValidator{
    public validate(request: any): any {

        if (!request.email) {
            return AuthErrors.MissingEmail()
        } else if (!this.isValidEmail(request.email)) {
            return AuthErrors.InvalidEmail()
        }

        if (!request.password) {
            return AuthErrors.MissingPassword()
        }
    }
}