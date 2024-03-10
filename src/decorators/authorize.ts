import {UnauthorizedError} from "../domain/common/errors";
import {RoleAttribute} from "../security";

export function authorize(permission: string) {
    return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;
        descriptor.value = function (...args: any[]) {
            const request = args.find(arg => arg.user.permissions !== null)
            if(!request) {
                throw new UnauthorizedError()
            }
            const currentUser = request.user
            const isAuthorized = currentUser.permissions.includes(permission)
                || (currentUser.id === request.params.id
                    || currentUser.role === RoleAttribute.Admin)
            console.log(isAuthorized)
            return originalMethod.apply(this, args);
        };
    }
}