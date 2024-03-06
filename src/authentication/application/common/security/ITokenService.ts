export interface ITokenService {
    generateToken(id: string, user: any): string
    verifyToken(token: string): any
}