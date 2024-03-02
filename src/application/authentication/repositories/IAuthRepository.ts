import User from "../../../domain/User";

export interface IAuthRepository {

    addUser(user: User): Promise<User>
}