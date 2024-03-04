import {BcryptCryptoService} from "./BcryptCryptoService";

export class CryptoServiceFactory {
    static createCryptoService(type: string): any {
        if (type === 'BCRYPT') {
            return BcryptCryptoService;
        }
    }
}