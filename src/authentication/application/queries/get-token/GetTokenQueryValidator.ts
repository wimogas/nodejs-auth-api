import AuthValidator from "../../common/validator/AuthValidator";
import {singleton} from "tsyringe";
import {Error} from "../../../domain/errors/Error";

@singleton()
export default class GetTokenQueryValidator extends AuthValidator{
    public validate(request: any): any {

        if (!request.email) {
            return Error.NotFound("Email is required")
        } else if (!this.isValidEmail(request.email)) {
            return Error.Validation("Emails is not valid")
        }

        if (!request.password) {
            return Error.NotFound("Password is required")
        }
    }
}