export interface ITokenService {
    generateToken(id: string, email: string): string
    verifyToken(token: string): string
}