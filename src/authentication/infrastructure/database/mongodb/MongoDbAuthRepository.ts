import {IAuthRepository} from "../../../application/common/interfaces/IAuthRepository";
import AuthUserModel from './models/AuthUser'
import {AuthUser} from "../../../domain/AuthUser";

export class MongoDbAuthRepository implements IAuthRepository {

    public async addAuthUser(user: AuthUser): Promise<void> {
        await AuthUserModel.create({
            _id: user.id.value,
            email: user.email,
            password: user.password
        })
    }

    public async getAuthUserByEmail(email: string): Promise<any> {
        const foundUser = await AuthUserModel.findOne({email: email});
        if (foundUser) {
            return AuthUser.create(
                foundUser._id.toString(),
                foundUser.email,
                foundUser.password
            )
        }
    }
}