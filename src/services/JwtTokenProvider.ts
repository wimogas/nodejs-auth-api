import jwt from 'jsonwebtoken'
import {ITokenProvider} from "../interfaces";
import {PermissionAttribute, RoleAttribute} from "../security";
import {UnauthorizedError} from "../domain/common/errors";
import {PermissionId} from "../domain/auth/fields/PermissionId";

export class JwtTokenProvider implements ITokenProvider {

    private secret = process.env.JWT_SECRET

    public generateToken(user: any, permissions: string): string {

        const permissionsToAdd = permissions ? permissions : PermissionAttribute.ViewUser
        const role = user.role ? user.role.name : RoleAttribute.User

        return jwt.sign({
            id: user.id,
            email: user.email,
            permissions: permissionsToAdd,
            role
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