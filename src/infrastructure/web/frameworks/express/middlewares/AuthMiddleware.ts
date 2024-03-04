import {Response, NextFunction} from "express";
import {JwtTokenService} from "../../../../security/JwtTokenService";
import {IVerifiedRequest} from "../interfaces/IVerifiedRequest";

class AuthMiddleware {
    public authenticate(req: IVerifiedRequest, res: Response, next: NextFunction) {
        const token = req.header('Authorization')

        if (!token) {
            throw {
                statusCode: 401,
                message: "Unauthorized"
            }
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
            throw {
                statusCode: 401,
                message: "Invalid token"
            }
        }


    }
}

export default new AuthMiddleware();

