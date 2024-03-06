import bcrypt from "bcrypt";
import {ICryptoService} from "../../../application/common/interfaces/ICryptoService";

export class BcryptCryptoService implements ICryptoService {
    public async handleHash(password: string, salt: number): Promise<string> {
        return await bcrypt.hash(password, salt)
    }

    public async handleCompare(password: string, hash: string): Promise<boolean> {
        return await bcrypt.compare(password, hash)
    }
}