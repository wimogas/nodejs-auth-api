import jwt from 'jsonwebtoken'
import {ITokenService} from "../../../application/common/interfaces/ITokenService";
import {AuthUser} from "../../../domain/AuthUser";

export class JwtTokenService implements ITokenService {

    private secret = process.env.JWT_SECRET

    public generateToken(user: AuthUser): string {
        return jwt.sign({
            id: user.id.value,
            email: user.email,
            permissions: user.permissions,
            roles: user.roles
        }, this.secret, {
            expiresIn: '1d'
        })
    }

    public verifyToken(token: string): any {
        return jwt.verify(token, this.secret)
    }
}