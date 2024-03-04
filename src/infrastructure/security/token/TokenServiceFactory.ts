import {JwtTokenService} from "./JwtTokenService";

export class TokenServiceFactory {
    static createTokenService(type: string): any {
        if (type === 'JWT') {
            return JwtTokenService;
        }
    }
}