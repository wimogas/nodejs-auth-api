import {AuthUser} from "../../../domain/authentication/AuthUser";

export interface IAuthRepository {
    addAuthUser(user: AuthUser): Promise<void>
    getAuthUserByEmail(email: string): Promise<any>
}