import {IAuthRepository} from "../../../../application/common/persistance/IAuthRepository";
import {AuthUser} from "../../../../domain/authentication/AuthUser";

export class InMemoryAuthRepository implements IAuthRepository {

    private users: AuthUser[] = []

    public async addAuthUser(user: AuthUser): Promise<void> {
        await Promise.resolve()
        this.users.push(user)
    }

    public async getAuthUserByEmail(email: string): Promise<any> {
        await Promise.resolve()
        const foundUser = this.users.filter(u => u.email === email)

        if (foundUser.length > 0) {
            return {
                id: foundUser[0].id.value,
                email: foundUser[0].email,
                password: foundUser[0].password
            }
        }
    }
}