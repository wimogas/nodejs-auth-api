import {UnauthorizedError} from "../../domain/common/errors";
import {Permission, Role} from "../../application/common/security";
/*
* TS Method Decorator:
* @authorize(permission)
*/

export function authorize(permission: string) {
    return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const classMethod = descriptor.value;
        descriptor.value = (...args: any[]) => {
            const request = args.find(arg => arg.user !== null)
            const currentUser = request.user

            const isAuthorized = (currentUser.permissions.includes(permission)
                || currentUser.permissions.includes(Permission.AdminPermission))
                && (currentUser.id === request.params.id || currentUser.role === Role.Admin)

            if (!isAuthorized) {
                throw new UnauthorizedError()
            }
            return classMethod.apply(this, args);
        };
    }
}