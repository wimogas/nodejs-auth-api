import User from "../../../../domain/entities/User";

export interface IAuthRepository {
    addUser(user: User): Promise<void>
    getUserByEmail(email: string): Promise<any>
}