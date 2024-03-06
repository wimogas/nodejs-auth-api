import User from "../../../../domain/authentication/AuthUser";

export interface ITokenService {
    generateToken(id: string, user: User): string
    verifyToken(token: string): any
}