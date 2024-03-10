import {User} from "../../domain/user";

export interface IUserRepository {
    addUser(user: any): Promise<any>
    getUserById(id: string): Promise<any>
    getUserByEmail(email: string): Promise<any>
    deleteUser(id: string): Promise<void>
    updateUser(user: any): Promise<void>
}