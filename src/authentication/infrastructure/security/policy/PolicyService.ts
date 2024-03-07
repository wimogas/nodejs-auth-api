import {AuthRole} from "../../../application/common/security/roles/AuthRoles";
import {AuthPolicy} from "../../../application/common/security/policy/AuthPolicies";

export class PolicyService {
    public check(request: any, policy: string) {

        if (policy === AuthPolicy.AdminOrSame) {
            return this.isAdminOrSame(request)
        }
    }

    private isAdminOrSame(request: any) {
        return (request.params.id === request.user.id || request.user.roles.includes(AuthRole.Admin));
    }
}