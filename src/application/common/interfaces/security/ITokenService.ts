import User from "../../../../domain/authentication/User";

export interface ITokenService {
    generateToken(id: string, user: User): string
    verifyToken(token: string): any
}