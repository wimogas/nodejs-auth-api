import {User} from "../domain/user";

export interface ITokenProvider {
    generateToken(user: any): string
    verifyToken(token: string): any
}