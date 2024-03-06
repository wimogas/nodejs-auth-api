import User from "../../../../domain/authentication/User";

export interface IAuthRepository {
    addUser(user: User): Promise<void>
    getUserByEmail(email: string): Promise<any>
}