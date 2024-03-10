export interface ITokenProvider {
    generateToken(user: any, permissions: string): string
    verifyToken(token: string): any
}