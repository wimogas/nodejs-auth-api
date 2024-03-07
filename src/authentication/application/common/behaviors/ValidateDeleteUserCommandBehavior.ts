import {container} from "../../../api/di";
import {singleton} from "tsyringe";
import {IHTTPRequest} from "../interfaces/IHTTPRequest";
import AuthenticationController from "../../../api/AuthenticationController";
import {AuthorizationService} from "../../../infrastructure/security/AuthorizationService";
import {AuthPolicy} from "../security/policy/AuthPolicies";
import {AuthErrors} from "../../../domain/errors/AuthErrors";

@singleton()
export class ValidateDeleteUserCommandBehavior {

    public async execute(request: IHTTPRequest) {

        const authorizationService = container.resolve(AuthorizationService)

        const isAuthorized = authorizationService.authorize(request, {
            policies: AuthPolicy.AdminOrSame
        })

        if (!isAuthorized) {
            throw AuthErrors.Unauthorized()
        }

        const authController = container.resolve(AuthenticationController)

        await authController.deleteUser(request)
    }
}