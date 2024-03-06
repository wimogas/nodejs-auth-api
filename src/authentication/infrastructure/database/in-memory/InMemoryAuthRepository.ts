import {IAuthRepository} from "../../../application/common/interfaces/IAuthRepository";
import {AuthUser} from "../../../domain/AuthUser";

export class InMemoryAuthRepository implements IAuthRepository {

    private users: AuthUser[] = []

    public async addAuthUser(user: AuthUser): Promise<void> {
        await Promise.resolve()
        this.users.push(user)
    }

    public async getAuthUserByEmail(email: string): Promise<any> {

        const foundUser = this.users.filter(u => u.email === email)
        if(foundUser.length > 0) {
            return AuthUser.create(
                foundUser[0].id.value,
                foundUser[0].email,
                foundUser[0].password
            )
        }
    }
}