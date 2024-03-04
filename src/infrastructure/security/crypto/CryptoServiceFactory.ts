import {BcryptCryptoService} from "./BcryptCryptoService";
import {ICryptoService} from "../../../application/common/interfaces/security/ICryptoService";

export class CryptoServiceFactory {
    static createCryptoService(type: string): ICryptoService {
        if (type === 'BCRYPT') {
            return new BcryptCryptoService();
        }
    }
}