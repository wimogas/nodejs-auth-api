import jwt from 'jsonwebtoken'
import {ITokenProvider} from "../interfaces";
import {Permission, Role} from "../security";
import {UnauthorizedError} from "../domain/common/errors";

export class JwtTokenProvider implements ITokenProvider {

    private secret = process.env.JWT_SECRET

    public generateToken(user: any): string {

        const permissions = user.permissions ? user.permissions : `${Permission.UserDelete},${Permission.UserEdit}`
        const roles = user.roles ? user.roles : Role.User

        return jwt.sign({
            id: user.id,
            email: user.email,
            permissions,
            roles
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