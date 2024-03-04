import {Response, NextFunction} from "express";
import {IVerifiedRequest} from "../interfaces/IVerifiedRequest";
import {AuthErrors} from "../../../../../domain/errors/AuthErrors";
import container from '../../../di'

class AuthMiddleware {
    public authenticate(req: IVerifiedRequest, res: Response, next: NextFunction) {
        const token = req.header('Authorization')

        if (!token) {
            throw AuthErrors.Unauthorized()
        }

        try {
            const tokenService = container.resolve('tokenService')
            const decodedToken = tokenService.verifyToken(token.split(' ')[1])

            req.user = {
                id: decodedToken.id,
                name: decodedToken.name,
                email: decodedToken.email
            }

            next()
        } catch (error) {
            throw AuthErrors.InvalidToken()
        }


    }
}

export default new AuthMiddleware();

