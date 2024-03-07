import {AuthUser} from "../../../domain/AuthUser";

export interface IAuthRepository {
    addAuthUser(user: AuthUser): Promise<void>
    getAuthUserById(id: string): Promise<any>
    getAuthUserByEmail(email: string): Promise<any>
    deleteUser(id: string): Promise<void>
}