import UserModel from './models/UserModel'
import {User} from "../../../domain/user";
import {IUserRepository} from "../../../application/interfaces";


export class UserRepository implements IUserRepository {

    public async addUser(user: any): Promise<any> {
        await UserModel.create({
            _id: user.id.value,
            email: user.email.value,
            password: user.password.value,
            role: user.role.value
        })
        return await this.getUserByEmail(user.email.value)
    }

    public async getUserByEmail(email: string): Promise<any> {
        return UserModel.findOne({email: email})
            .populate({
                path: 'role',
                populate: {
                    path: 'permissions'
            }})
    }

    public async getUserById(id: string): Promise<any> {
        return UserModel.findOne({_id: id}).populate({
            path: 'role',
            populate: {
                path: 'permissions'
            }})
    }

    public async deleteUser(id: string): Promise<void> {
        await UserModel.deleteOne({_id: id});
    }

    public async updateUser(user: User): Promise<void> {
        await UserModel.findOneAndUpdate({
            _id: user.id
        },{
            email: user.email,
            password: user.password
        });
    }
}