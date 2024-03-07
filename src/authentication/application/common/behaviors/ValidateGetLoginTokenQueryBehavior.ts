import {container} from "../../../api/di";
import {IHTTPRequest} from "../interfaces/IHTTPRequest";
import AuthenticationController from "../../../api/AuthenticationController";
import GetTokenQueryValidator from "../../queries/get-token/GetTokenQueryValidator";

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