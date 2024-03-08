import {IAuthRepository} from "../../interfaces/IAuthRepository";
import {User} from "../../domain/user/User";

export class InMemoryAuthRepository implements IAuthRepository {

    private _users: User[] = []

    public async addAuthUser(user: User): Promise<void> {
        await Promise.resolve()
        this._users.push(user)
    }

    public async getAuthUserByEmail(email: string): Promise<any> {
        return this._users.filter(u => u.email.value === email)[0]
    }

    public async getAuthUserById(id: string): Promise<any> {
        return this._users.filter(u => u.id.value === id)[0]
    }

    public async deleteUser(id: string): Promise<void> {
        this._users = this._users.filter(u => u.id.value !== id)
    }
}