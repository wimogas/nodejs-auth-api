import {Response, NextFunction} from "express";
import {IVerifiedRequest} from "../interfaces/IVerifiedRequest";
import {singleton} from "tsyringe";
import {JwtTokenService} from "../../../../authentication/infrastructure/services/token/JwtTokenService";
import {AuthErrors} from "../../../../authentication/domain/errors/AuthErrors";

@singleton()
export default class AuthMiddleware {

    public authenticate(req: IVerifiedRequest, res: Response, next: NextFunction) {
        const token = req.header('Authorization')

        if (!token) {
            throw AuthErrors.Unauthorized()
        }

        try {
            const tokenService = new JwtTokenService()
            const decodedToken = tokenService.verifyToken(token.split(' ')[1])

            req.user = {
                id: decodedToken.id,
                email: decodedToken.email
            }

            next()
        } catch (error) {
            throw AuthErrors.InvalidToken()
        }
    }
}