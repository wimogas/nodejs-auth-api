import {User} from "../domain/user";

export interface ITokenProvider {
    generateToken(user: User): string
    verifyToken(token: string): any
}