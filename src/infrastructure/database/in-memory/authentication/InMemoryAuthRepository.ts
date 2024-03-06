import {IAuthRepository} from "../../../../application/common/interfaces/persistance/IAuthRepository";
import {User} from "../../../../domain/authentication/User";

export class InMemoryAuthRepository implements IAuthRepository {

    private users: User[] = []

    public async addUser(user: User): Promise<void> {
        await Promise.resolve()
        this.users.push(user)
    }

    public async getUserByEmail(email: string): Promise<any> {
        await Promise.resolve()
        const foundUser = this.users.filter(u => u.email === email)

        if (foundUser.length > 0) {
            return {
                id: foundUser[0].id.value,
                name: foundUser[0].name,
                email: foundUser[0].email,
                password: foundUser[0].password
            }
        }
    }
}