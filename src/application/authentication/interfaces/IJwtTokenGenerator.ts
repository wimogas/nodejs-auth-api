export interface IJwtTokenGenerator {
    generateToken(id: string, email: string): string
}