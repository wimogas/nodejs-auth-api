import AuthValidator from "../../../common/validators/AuthValidator";
import {AuthErrors} from "../../../../domain/errors/AuthErrors";
import {injectable, singleton} from "tsyringe";

@singleton()
export default class RegisterCommandValidator extends AuthValidator {
    public validate(request: any): any {

        if (!request.name) {
            return AuthErrors.MissingName()
        }

        if (!request.email) {
            return AuthErrors.MissingEmail()
        } else if (!this.isValidEmail(request.email)) {
            return AuthErrors.InvalidEmail()
        }

        if (!request.password) {
            return AuthErrors.MissingPassword()
        } else if (!this.isValidPassword(request.password)) {
            return AuthErrors.InvalidPassword()
        }
    }

    private isValidPassword(password: string): boolean {
        const regex =  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W)[A-Za-z\d\W]{6,15}$/;
        return regex.test(password)
    }
}