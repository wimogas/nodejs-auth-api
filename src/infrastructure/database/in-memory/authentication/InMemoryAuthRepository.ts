import {IAuthRepository} from "../../../../application/common/interfaces/persistance/IAuthRepository";
import User from "../../../../domain/entities/User";

export class InMemoryAuthRepository implements IAuthRepository {

    private users: User[] = []

    public async addUser(user: User): Promise<void> {
        await Promise.resolve()
        this.users.push(user)
    }

    public async getUserByEmail(email: string): Promise<any> {
        const foundUser = this.users.filter(u => u.getEmail === email)

        if (foundUser.length > 0) {
            return {
                _id: foundUser[0].id,
                name: foundUser[0].getName,
                email: foundUser[0].getEmail,
                password: foundUser[0].getPassword
            }
        }
    }
}