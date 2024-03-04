import {IAuthRepository} from "../../../../application/common/interfaces/persistance/IAuthRepository";
import User from "../../../../domain/entities/User";
import UserModel from './models/User'

export class AuthRepository implements IAuthRepository {

    public async addUser(user: User): Promise<void> {
        await UserModel.create({
            _id: user.id,
            name: user.getName,
            email: user.getEmail,
            password: user.getPassword
        })
    }

    public async getUserByEmail(email: string): Promise<any> {
        return UserModel.findOne({email: email});
    }
}