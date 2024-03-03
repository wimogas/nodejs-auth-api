import jwt from 'jsonwebtoken'
import {IJwtTokenGenerator} from "../../application/authentication/interfaces/IJwtTokenGenerator";

export class JwtTokenGenerator implements IJwtTokenGenerator {
    public generateToken(id: string, email: string): string {
        return jwt.sign({id, email}, process.env.JWT_SECRET, {
            expiresIn: '1d'
        })
    }
}