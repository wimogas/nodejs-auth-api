import {IAuthRepository} from "../../../application/common/interfaces/IAuthRepository";
import AuthUserModel from './models/AuthUserModel'
import {User} from "../../../domain/User";

export class MongoDbAuthRepository implements IAuthRepository {

    public async addAuthUser(user: User): Promise<void> {
        await AuthUserModel.create({
            _id: user.id.value,
            email: user.email.value,
            password: user.password.value,
        })
    }

    public async getAuthUserByEmail(email: string): Promise<any> {
        return AuthUserModel.findOne({email: email});
    }

    public async getAuthUserById(id: string): Promise<any> {
        return AuthUserModel.findOne({_id: id});
    }

    public async deleteUser(id: string): Promise<void> {
        await AuthUserModel.deleteOne({_id: id});
    }
}