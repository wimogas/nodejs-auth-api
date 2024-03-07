import {IAuthRepository} from "../../../application/common/interfaces/IAuthRepository";
import {AuthUser} from "../../../domain/AuthUser";

export class InMemoryAuthRepository implements IAuthRepository {

    private _users: AuthUser[] = []

    public async addAuthUser(user: AuthUser): Promise<void> {
        await Promise.resolve()
        this._users.push(user)
    }

    public async getAuthUserByEmail(email: string): Promise<any> {
        return this._users.filter(u => u.email === email)[0]
    }

    public async getAuthUserById(id: string): Promise<any> {
        return this._users.filter(u => u.id.value === id)[0]
    }

    public async deleteUser(id: string): Promise<void> {
        this._users = this._users.filter(u => u.id.value !== id)
    }
}