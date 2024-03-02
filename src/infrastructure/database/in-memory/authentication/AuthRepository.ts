import {IAuthRepository} from "../../../../application/authentication/interfaces/IAuthRepository";
import User from "../../../../domain/User";

export class AuthRepository implements IAuthRepository {
    private _db = []
    public async addUser(user: User): Promise<User> {

        this._db.push(user)

        return new User({
            name: user.getName,
            email: user.getEmail,
            password: user.getPassword,
        }, '65e0936b330d7e4c8d503cec')
    }
}