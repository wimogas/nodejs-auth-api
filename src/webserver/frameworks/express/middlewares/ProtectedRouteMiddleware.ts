import {Response, Request, NextFunction} from "express";
import {UnauthorizedError} from "../../../../domain/common/errors";
import {JwtTokenProvider} from "../../../../services/JwtTokenProvider";
import {ICustomRequest} from "../interfaces";


class ProtectedRouteMiddleware {

    public async setRequestUser(req: ICustomRequest, res: Response, next: NextFunction): Promise<void> {

        const token = req.headers.authorization && req.headers.authorization.split(" ")[1].length > 0 ? req.headers.authorization.split(" ")[1] : null

        if (!token) {
            return next(new UnauthorizedError())
        }

        const tokenProvider = new JwtTokenProvider()
        const decodedToken = tokenProvider.verifyToken(token)
        console.log(decodedToken)
        if (!decodedToken) {
            return next(new UnauthorizedError())
        }

        req.user = {
            id: decodedToken.id,
            email: decodedToken.email,
            permissions: decodedToken.permissions,
            roles: decodedToken.roles
        }

        return next()
    }
}

export default new ProtectedRouteMiddleware()