import {container} from "../../../api/di";
import CreateUserCommandValidator from "../../commands/create-user/CreateUserCommandValidator";
import {IHTTPRequest} from "../interfaces/IHTTPRequest";
import AuthenticationController from "../../../api/AuthenticationController";

export class ValidateCreateUserCommandBehavior {

    public async execute(request: IHTTPRequest) {

        const validator = container.resolve(CreateUserCommandValidator);

        const error = validator.validate(request.body)

        const authController = container.resolve(AuthenticationController)

        if (error) {
            throw error
        } else {
           return await authController.createUser(request)
        }
    }
}