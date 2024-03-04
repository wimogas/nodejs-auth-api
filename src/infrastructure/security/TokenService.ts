import jwt, {JwtPayload} from 'jsonwebtoken'
import {ITokenService} from "../../application/common/interfaces/authentication/ITokenService";

export class TokenService implements ITokenService {

    private secret = process.env.JWT_SECRET

    public generateToken(id: string, email: string): string {
        return jwt.sign({id, email}, this.secret, {
            expiresIn: '1d'
        })
    }

    public verifyToken(token: string): any {
        return jwt.verify(token, this.secret)
    }
}