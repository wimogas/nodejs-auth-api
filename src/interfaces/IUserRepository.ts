import {User} from "../domain/user";

export interface IUserRepository {
    addUser(user: User): Promise<string>
    getUserById(id: string): Promise<any>
    getUserByEmail(email: string): Promise<any>
    deleteUser(id: string): Promise<void>
    updateUser(user: User): Promise<void>
    getUserRoleAndPermissions(role?: string): Promise<any>
}