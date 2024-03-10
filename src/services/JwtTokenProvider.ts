import jwt from 'jsonwebtoken'
import {PermissionAttribute, RoleAttribute} from "../security";
import {ITokenProvider} from "./ITokenProvider";

export class JwtTokenProvider implements ITokenProvider {

    private secret = process.env.JWT_SECRET

    public generateToken(user: any): string {

        const permissions = user.permissions ? user.permissions : PermissionAttribute.ViewUser
        const role = user.role ? user.role.name : RoleAttribute.User

        return jwt.sign({
            id: user.id,
            email: user.email,
            role,
            permissions
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