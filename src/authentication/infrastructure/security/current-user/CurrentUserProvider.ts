import {ICurrentUser} from "./ICurrentUser";
import {ITokenService} from "../../../application/common/interfaces/ITokenService";
import {inject, singleton} from "tsyringe";
import {IHTTPRequest} from "../../../application/common/interfaces/IHTTPRequest";
import {AuthErrors} from "../../../domain/errors/AuthErrors";
import {ICurrentUserProvider} from "./ICurrentUserProvider";

@singleton()
export class CurrentUserProvider implements ICurrentUserProvider {
    public constructor(@inject("tokenService") private tokenService: ITokenService) {
    }
    public getCurrentUser(request: IHTTPRequest): ICurrentUser {
        const token = request.headers.authorization

        if (!token) {
            throw AuthErrors.Unauthorized()
        }

        const decodedToken = this.tokenService.verifyToken(token.split(" ")[1])

        return {
            id: decodedToken.id,
            email: decodedToken.email,
            permissions: decodedToken.permissions,
            roles: decodedToken.roles
        }
    }
}