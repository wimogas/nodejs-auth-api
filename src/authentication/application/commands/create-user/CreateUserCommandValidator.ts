import AuthValidator from "../../common/validator/AuthValidator";
import {singleton} from "tsyringe";
import {Error} from "../../../domain/errors/Error";

@singleton()
export default class CreateUserCommandValidator extends AuthValidator {
    public validate(request: any): any {

        if (!request.email) {
            return Error.NotFound("Email is required")
        } else if (!this.isValidEmail(request.email)) {
            return Error.Validation("Email is not valid")
        }

        if (!request.password) {
            return Error.NotFound("Password is required")
        } else if (!this.isValidPassword(request.password)) {
            return Error.Validation("Password must be at least 6 characters and contain at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 symbol")
        }
    }

    private isValidPassword(password: string): boolean {
        const regex =  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W)[A-Za-z\d\W]{6,15}$/;
        return regex.test(password)
    }
}