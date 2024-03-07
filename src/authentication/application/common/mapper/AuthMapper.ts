import {IHTTPRequest} from "../interfaces/IHTTPRequest";
import IAuthenticationRequest from "../../../contracts/IAuthenticationRequest";
import {AuthUser} from "../../../domain/AuthUser";
import IAuthenticationResponse from "../../../contracts/IAuthenticationResponse";

export class AuthMapper {

    public static toRequest(request: IHTTPRequest): IAuthenticationRequest {
        return {
            email: request.body.email,
            password: request.body.password,
            permissions: request.body.permissions,
            roles: request.body.roles
        }
    }

    public static toResponse(token: string): IAuthenticationResponse {
        return {
            token,
        }
    }
}