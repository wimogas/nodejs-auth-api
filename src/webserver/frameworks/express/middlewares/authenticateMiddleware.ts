import {Response, Request, NextFunction} from "express";
import {UnauthorizedError} from "../../../../domain/common/errors";
import {JwtTokenProvider} from "../../../../services/JwtTokenProvider";
import {ICustomRequest} from "../interfaces";

const authenticateMiddleware = (req: ICustomRequest, res: Response, next: NextFunction) => {

    const token = req.headers.authorization
    && req.headers.authorization.length > 0
        ? req.headers.authorization.split(" ")[1]
        : null

    if (!token) {
        return next(new UnauthorizedError())
    }

    const tokenProvider = new JwtTokenProvider()
    const decodedToken = tokenProvider.verifyToken(token)

    if (!decodedToken) {
        return next(new UnauthorizedError())
    }

    req.user = {
        id: decodedToken.id,
        email: decodedToken.email,
        permissions: decodedToken.permissions,
        role: decodedToken.role
    }

    return next()
}

export default authenticateMiddleware;