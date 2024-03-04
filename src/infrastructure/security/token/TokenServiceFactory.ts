import {JwtTokenService} from "./JwtTokenService";
import {ITokenService} from "../../../application/common/interfaces/authentication/ITokenService";

export class TokenServiceFactory {
    static createTokenService(type: string): ITokenService {
        if (type === 'JWT') {
            return new JwtTokenService();
        }
    }
}