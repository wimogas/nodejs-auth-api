import {IAuthRepository} from "../../../../application/common/interfaces/persistance/IAuthRepository";
import User from "../../../../domain/User";
import UserModel from './models/User'
import {ICryptoService} from "../../../../application/common/interfaces/authentication/ICryptoService";

export class AuthRepository implements IAuthRepository {
    private _crypto: ICryptoService;

    public constructor(crypto: ICryptoService) {
        this._crypto = crypto
    }

    public async addUser(user: User): Promise<User> {

        const existingUser = await UserModel.findOne({
            email: user.getEmail
        })

        if (existingUser) {
            throw {
                statusCode: 409,
                message: "User already exists"
            }
        }

        const hashedPassword = await this._crypto.handleHash(user.getPassword, 10)

        const persistedUser = await UserModel.create({
            name: user.getName,
            email: user.getEmail,
            password: hashedPassword
        })

       return User.create({
            name: persistedUser.name,
            email: persistedUser.email,
            password: persistedUser.password
        }, persistedUser._id.toString())

    }

    public async getUser(email: string, password: string): Promise<User> {

        const foundUser = await UserModel.findOne({
            email: email
        })

        let isCorrectPassword: boolean;

        if (foundUser) {
            isCorrectPassword = await this._crypto.handleCompare(password, foundUser.password)
        }

        if (!foundUser || !isCorrectPassword) {
            throw {
                message: "Invalid credentials"
            }
        }

        return User.create({
            name: foundUser.name,
            email: foundUser.email,
            password: foundUser.password
        }, foundUser._id.toString())
    }
}