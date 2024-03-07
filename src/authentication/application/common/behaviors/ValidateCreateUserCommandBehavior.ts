import {container} from "../../../api/di";
import CreateUserCommandValidator from "../../commands/create-user/CreateUserCommandValidator";
import {IHTTPRequest} from "../interfaces/IHTTPRequest";
import AuthenticationController from "../../../api/controllers/AuthenticationController";
import IAuthenticationResponse from "../../../contracts/IAuthenticationResponse";
import {Error} from "../../../domain/errors/Error";

export class ValidateCreateUserCommandBehavior {

    public async execute(request: IHTTPRequest): Promise<Error|IAuthenticationResponse> {

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