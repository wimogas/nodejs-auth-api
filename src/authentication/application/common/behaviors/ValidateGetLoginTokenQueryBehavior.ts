import {container} from "../../../api/di";
import CreateUserCommandValidator from "../../commands/create-user/CreateUserCommandValidator";
import {singleton} from "tsyringe";
import {IHTTPRequest} from "../interfaces/IHTTPRequest";
import AuthenticationController from "../../../api/AuthenticationController";
import GetTokenQueryValidator from "../../queries/get-token/GetTokenQueryValidator";

@singleton()
export class ValidateGetLoginTokenQueryBehavior {

    public async execute(request: IHTTPRequest) {

        const validator = container.resolve(GetTokenQueryValidator);

        const error = validator.validate(request.body)

        const authController = container.resolve(AuthenticationController)

        if (error) {
            throw error
        } else {
           return await authController.getLoginToken(request)
        }
    }
}