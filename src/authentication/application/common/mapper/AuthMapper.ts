import {IHTTPRequest} from "../../../../common/http/interfaces/IHTTPRequest";
import IAuthenticationRequest from "../../../contracts/authentication/IAuthenticationRequest";
import {AuthUser} from "../../../domain/authentication/AuthUser";
import IAuthenticationResponse from "../../../contracts/authentication/IAuthenticationResponse";

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