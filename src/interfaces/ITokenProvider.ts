export interface ITokenProvider {
    generateToken(user: any): string
    verifyToken(token: string): any
}