import {IAuthRepository} from "../../../application/common/interfaces/IAuthRepository";
import AuthUserModel from './models/AuthUserModel'
import {AuthUser} from "../../../domain/AuthUser";
import {AuthUserId} from "../../../domain/ValueObjects/AuthUserId";
import {Errors} from "../../../domain/errors/Errors";
import {IError} from "../../../domain/errors/IError";

export class MongoDbAuthRepository implements IAuthRepository {

    public async addAuthUser(user: AuthUser): Promise<void> {
        await AuthUserModel.create({
            _id: user.id.value,
            email: user.email,
            password: user.password,
            permissions: user.permissions,
            roles: user.roles
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