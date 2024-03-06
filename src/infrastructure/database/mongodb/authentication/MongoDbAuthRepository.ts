import {IAuthRepository} from "../../../../application/common/interfaces/persistance/IAuthRepository";
import {User} from "../../../../domain/authentication/User";
import UserModel from './models/User'

export class MongoDbAuthRepository implements IAuthRepository {

    public async addUser(user: User): Promise<void> {
        await UserModel.create({
            _id: user.id.value,
            name: user.name,
            email: user.email,
            password: user.password
        })
    }

    public async getUserByEmail(email: string): Promise<any> {
        return UserModel.findOne({email: email});
    }
}