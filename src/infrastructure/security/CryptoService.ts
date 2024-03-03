import bcrypt from "bcrypt";
import {ICryptoService} from "../../application/authentication/interfaces/ICryptoService";

export class CryptoService implements ICryptoService {
    public async handleHash(password: string, salt: number): Promise<string> {
        return await bcrypt.hash(password, salt)
    }

    public async handleCompare(password: string, hash: string): Promise<boolean> {
        return await bcrypt.compare(password, hash)
    }
}