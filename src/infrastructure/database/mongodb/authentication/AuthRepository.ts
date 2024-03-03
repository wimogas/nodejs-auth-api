import {IAuthRepository} from "../../../../application/authentication/interfaces/IAuthRepository";
import User from "../../../../domain/User";
import UserModel from './models/User'

// ERROR: inject dependency
import bcrypt from 'bcrypt'

export class AuthRepository implements IAuthRepository {
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

        const hashedPassword = await bcrypt.hash(user.getPassword, 10)

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

}