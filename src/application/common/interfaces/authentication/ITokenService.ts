import User from "../../../../domain/entities/User";

export interface ITokenService {
    generateToken(id: string, user: User): string
    verifyToken(token: string): string
}