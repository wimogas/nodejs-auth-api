import {IAuthRepository} from "../../../../application/authentication/interfaces/IAuthRepository";
import User from "../../../../domain/User";
import UserModel from './models/User'
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

    public async getUser(email: string, password: string): Promise<User> {

        const foundUser = await UserModel.findOne({
            email: email
        })

        if (!foundUser) {
            throw {
                message: "User not found"
            }
        }

        return User.create({
            name: foundUser.name,
            email: foundUser.email,
            password: foundUser.password
        }, foundUser._id.toString())
    }

}