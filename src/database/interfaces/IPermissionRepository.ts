import {Permission} from "../../domain/permission/Permission";

export interface IPermissionRepository {
    addPermission(permission: Permission): Promise<void>
    updatePermission(permissionId: string, changes: any): Promise<any>
    getPermissionById(id: string): Promise<any>
    getPermissionByName(name: string): Promise<any>
    deletePermission(id: string): Promise<void>
}