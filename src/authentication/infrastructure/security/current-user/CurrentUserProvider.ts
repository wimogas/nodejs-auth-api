import {ICurrentUser} from "./ICurrentUser";
import {ITokenService} from "../../../application/common/interfaces/ITokenService";
import {inject, singleton} from "tsyringe";
import {IHTTPRequest} from "../../../application/common/interfaces/IHTTPRequest";
import {ICurrentUserProvider} from "./ICurrentUserProvider";
import {Error} from "../../../domain/errors/Error";

@singleton()
export class CurrentUserProvider implements ICurrentUserProvider {
    public constructor(@inject("tokenService") private tokenService: ITokenService) {
    }
    public getCurrentUser(request: IHTTPRequest): ICurrentUser {
        const token = request.headers.authorization

        if (!token) {
            throw Error.Unauthorized()
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