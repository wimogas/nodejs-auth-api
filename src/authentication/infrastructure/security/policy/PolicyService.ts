import {AuthenticationPolicy} from "../../../application/common/security/policy/AuthenticationPolicies";
import {AuthenticationRole} from "../../../application/common/security/roles/AuthenticationRoles";

export class PolicyService {
    public check(request: any, policy: string): boolean {
        if (policy === AuthenticationPolicy.AdminOrSame) {
            return this.isAdminOrSame(request)
        }
    }

    private isAdminOrSame(request: any): boolean {
        return (request.params.id === request.user.id || request.user.roles.includes(AuthenticationRole.Admin));
    }
}