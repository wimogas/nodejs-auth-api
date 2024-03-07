import AuthValidator from "../../common/validator/AuthValidator";
import {AuthErrors} from "../../../domain/errors/AuthErrors";
import {singleton} from "tsyringe";

@singleton()
export default class DeleteUserCommandValidator extends AuthValidator {
    public validate(request: any): any {
        console.log(request)
        if (request.params.id !== request.user.id) {
            return AuthErrors.Unauthorized()
        }

        if (!request.params.id) {
            return AuthErrors.MissingId()
        }

        if (!request.user.permissions) {
            return AuthErrors.MissingPermissions()
        }
    }
}