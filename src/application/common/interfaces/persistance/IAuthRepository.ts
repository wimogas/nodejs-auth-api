import User from "../../../../domain/User";

export interface IAuthRepository {
    addUser(user: User): Promise<User>
    getUser(email: string, password: string): Promise<User>
}