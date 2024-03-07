import {container} from "../../../api/di";

import {IHTTPRequest} from "../interfaces/IHTTPRequest";
import AuthenticationController from "../../../api/controllers/AuthenticationController";
import {AuthorizationService} from "../../../infrastructure/security/AuthorizationService";
import {AuthenticationPolicy} from "../security/policy/AuthenticationPolicies";
import {Error} from "../../../domain/errors/Error";

export class ValidateDeleteUserCommandBehavior {

    public async execute(request: IHTTPRequest): Promise<void> {

        const authorizationService = container.resolve(AuthorizationService)

        const isAuthorized = authorizationService.authorize(request, {
            policies: AuthenticationPolicy.AdminOrSame
        })

        if (!isAuthorized) {
            throw Error.Unauthorized()
        }

        const authController = container.resolve(AuthenticationController)

        await authController.deleteUser(request)
    }
}