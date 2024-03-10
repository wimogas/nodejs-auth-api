import {IAuthRepository} from "../../../interfaces/IAuthRepository";
import RoleModel from "./models/RoleModel";
import PermissionModel from "./models/PermissionModel";
import {Role} from "../../../domain/auth/Role";
import {Permission} from "../../../domain/auth/Permission";

export class MongoDbAuthRepository implements IAuthRepository {
    public async seedPermission(permission: Permission): Promise<void> {
        await PermissionModel.create({
            _id: permission.id.value,
            name: permission.name
        })
    }

    public async seedRole(role: Role): Promise<void> {
        await RoleModel.create({
            _id: role.id.value,
            name: role.name
        })
    }

    public async addPermissionToRole(id: string, permission: string): Promise<void> {
        const role = await RoleModel.findOne({_id: id})
        const foundPermission = await PermissionModel.findOne({name: permission})
        role.permissions.push(foundPermission._id)
        role.save()
    }
}