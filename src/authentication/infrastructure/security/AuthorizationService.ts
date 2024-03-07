import {IPolicyService} from "./policy/IPolicyService";
import {inject, singleton} from "tsyringe";

@singleton()
export class AuthorizationService {

    public constructor(
        @inject("currentUserProvider") private _currentUserProvider: any,
        @inject("policyService") private _policyService: IPolicyService
    ) {}

    public authorize(request: any, requirements: any): boolean {

        const currentUser = this._currentUserProvider.getCurrentUser(request)

        const authorizedRequest = {
            user: currentUser,
            body: request.body,
            query: request.query,
            params: request.params,
            headers: request.headers
        }
        // check requirements.roles

        // check requirements.permissions

        return this._policyService.check(authorizedRequest, requirements.policies)

    }
}