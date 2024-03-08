import {User} from "../domain/user/User";

export interface IUserRepository {
    addUser(user: User): Promise<void>
    getUserById(id: string): Promise<any>
    getUserByEmail(email: string): Promise<any>
    deleteUser(id: string): Promise<void>
    updateUser(user: User): Promise<void>
}