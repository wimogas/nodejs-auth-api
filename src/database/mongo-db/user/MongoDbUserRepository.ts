import UserModel from './models/UserModel'
import {User} from "../../../domain/user";
import {IUserRepository} from "../../../interfaces";
import RoleModel from "../auth/models/RoleModel";
import {RoleAttribute} from "../../../security";

export class MongoDbUserRepository implements IUserRepository {

    public async getUserRoleAndPermissions(role?: string): Promise<any> {
        const roleToFind = await RoleModel.findOne({
            name: role
        }).populate({
            path: 'permissions'
        }).exec()

        let permissions = []
        roleToFind.permissions.map((permission: any) => {
            permissions.push(permission.name)
        })
        return {
            role: roleToFind,
            permissions: permissions.join(",")
        }
    }

    public async addUser(user: User): Promise<string> {

        const role = user.role.name ? user.role.name : RoleAttribute.User
        const roleAndPermissions = await this.getUserRoleAndPermissions(role)

        await UserModel.create({
            _id: user.id.value,
            email: user.email.value,
            password: user.password.value,
            role: roleAndPermissions.role
        })

        return roleAndPermissions.permissions
    }

    public async getUserByEmail(email: string): Promise<any> {
        const user = await UserModel.findOne({email: email})
            .populate({
                path: 'role',
            });
        if (user) {
            const roleAndPermissions = await this.getUserRoleAndPermissions(user.role.name)

            return {
                id: user._id,
                email: user.email,
                password: user.password,
                role: roleAndPermissions.role,
                permissions: roleAndPermissions.permissions
            }
        }
    }

    public async getUserById(id: string): Promise<any> {
        return UserModel.findOne({_id: id});
    }

    public async deleteUser(id: string): Promise<void> {
        await UserModel.deleteOne({_id: id});
    }

    public async updateUser(user: User): Promise<void> {
        await UserModel.findOneAndUpdate({
            _id: user.id.value
        },{
            email: user.email.value,
            password: user.password.value
        });
    }
}