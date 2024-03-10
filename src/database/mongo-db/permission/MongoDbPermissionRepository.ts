import PermissionModel from "./models/PermissionModel";
import {IPermissionRepository} from "../../interfaces/IPermissionRepository";
import {Permission} from "../../../domain/permission/Permission";
import RoleModel from "../role/models/RoleModel";

export class MongoDbPermissionRepository implements IPermissionRepository {

    public async addPermission(permission: Permission): Promise<void> {
        await PermissionModel.create({
            _id: permission.id.value,
            name: permission.name
        })
    }

    public async updatePermission(permissionId: string, changes: any): Promise<any> {
        return PermissionModel.findOneAndUpdate(
            {_id: permissionId},
            {
                name: changes.name,
            })
    }

    public async getPermissionById(id: string): Promise<any> {
        return PermissionModel.findOne({_id: id})
    }

    public async getPermissionByName(name: string): Promise<any> {
        return PermissionModel.findOne({name})
    }

    public async deletePermission(id: string): Promise<void> {
        await PermissionModel.deleteOne({_id: id});
    }
}