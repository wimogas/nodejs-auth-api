import {User} from "../../domain/user";
import {IUserRepository} from "../../interfaces";

export class InMemoryUserRepository implements IUserRepository {

    private _users: User[] = []

    public async addUser(user: User): Promise<void> {
        await Promise.resolve()
        this._users.push(user)
    }

    public async getUserByEmail(email: string): Promise<any> {
        return this._users.filter(u => u.email.value === email)[0]
    }

    public async getUserById(id: string): Promise<any> {
        return this._users.filter(u => u.id.value === id)[0]
    }

    public async deleteUser(id: string): Promise<void> {
        this._users = this._users.filter(u => u.id.value !== id)
    }

    public async updateUser(user: User): Promise<void> {
        this._users = this._users.map(userToChange => {
            if(userToChange.id.value === user.id) {
                userToChange.email = user.email
                userToChange.password = user.password
            }
            return userToChange
        })
    }
}