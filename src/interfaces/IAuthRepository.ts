import {Role} from "../domain/auth/Role";
import {Permission} from "../domain/auth/Permission";

export interface IAuthRepository {
    seedRole(role: Role): Promise<void>
    seedPermission(permission: Permission): Promise<void>
    addPermissionToRole(roleId: string, permissionId: string): Promise<void>
}