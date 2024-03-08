export interface ITokenService {
    generateToken(user: any): string
    verifyToken(token: string): any
}