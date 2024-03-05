import {Response, NextFunction} from "express";
import {IVerifiedRequest} from "../interfaces/IVerifiedRequest";
import {AuthErrors} from "../../../../../domain/errors/AuthErrors";
import {JwtTokenService} from "../../../../security/token/JwtTokenService";
import {singleton} from "tsyringe";

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
                name: decodedToken.name,
                email: decodedToken.email
            }

            next()
        } catch (error) {
            throw AuthErrors.InvalidToken()
        }
    }
}