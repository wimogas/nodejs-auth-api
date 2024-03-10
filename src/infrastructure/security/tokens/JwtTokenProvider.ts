import jwt from 'jsonwebtoken'
import {ITokenProvider} from "./ITokenProvider";

export class JwtTokenProvider implements ITokenProvider {

    private secret = process.env.JWT_SECRET

    public generateToken(user: any): string {

        return jwt.sign({
            id: user.id,
            email: user.email,
            role: user.role,
            permissions: user.permissions
        }, this.secret, {
            expiresIn: '1d'
        })
    }

    public verifyToken(token: string): any {
        return jwt.verify(token, this.secret,(err, decoded) => {
            if(!err) {
                return decoded
            }
        })
    }
}