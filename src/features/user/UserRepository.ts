import UserModel from './DbUserModel'
import {User} from "../../domain/user/User";
import {IUserRepository} from "../../interfaces/IUserRepository";

export class UserRepository implements IUserRepository {

    public async addUser(user: User): Promise<void> {
        await UserModel.create({
            _id: user.id.value,
            email: user.email.value,
            password: user.password.value,
        })
    }

    public async getUserByEmail(email: string): Promise<any> {
        return UserModel.findOne({email: email});
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