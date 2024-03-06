import {AuthUser} from "../../../domain/AuthUser";

export interface IAuthRepository {
    addAuthUser(user: AuthUser): Promise<void>
    getAuthUserByEmail(email: string): Promise<any>
}