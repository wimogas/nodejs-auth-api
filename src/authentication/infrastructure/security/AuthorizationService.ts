import {IPolicyService} from "./policy/IPolicyService";
import {inject, singleton} from "tsyringe";
import {IPermissionsService} from "./permissions/IPermissionsService";
import {IRolesService} from "./roles/IRolesService";

@singleton()
export class AuthorizationService {

    public constructor(
        @inject("currentUserProvider") private _currentUserProvider: any,
        @inject("permissionsService") private _permissionsService: IPermissionsService,
        @inject("rolesService") private _rolesService: IRolesService,
        @inject("policyService") private _policyService: IPolicyService
    ) {}

    public authorize(request: any, requirements: any): boolean {

        const currentUser = this._currentUserProvider.getCurrentUser(request)

        const authorizedRequest = {
            user: currentUser,
            body: request.body,
            query: request.query,
            params: request.params,
        }

        return (
            this._permissionsService.check(authorizedRequest, requirements.permissions)
            && this._rolesService.check(authorizedRequest, requirements.roles)
            && this._policyService.check(authorizedRequest, requirements.policies)
        )
    }
}