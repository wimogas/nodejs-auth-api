import {IHTTPRequest} from "../interfaces/IHTTPRequest";
import IAuthenticationRequest from "../../../contracts/IAuthenticationRequest";
import {AuthUser} from "../../../domain/AuthUser";
import IAuthenticationResponse from "../../../contracts/IAuthenticationResponse";

export class AuthMapper {

    public static toRequest(request: IHTTPRequest): IAuthenticationRequest {
        return {
            email: request.body.email,
            password: request.body.password
        }
    }

    public static toResponse(user: AuthUser, token: string): IAuthenticationResponse {
        return {
            id: user.id.value,
            email: user.email,
            token: token
        }
    }
}