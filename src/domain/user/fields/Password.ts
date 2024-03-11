import {MissingPasswordError} from "../errors/MissingPasswordError";
import {InvalidPasswordError} from "../errors/InvalidPasswordError";
import {ValueObject} from "../../common/ValueObject";
import {BcryptCryptoService} from "../../../infrastructure/security";
import {ICryptoService} from "../../../infrastructure/security/crypto/ICryptoService";


export class Password extends ValueObject {
    private readonly _value: string
    private static _salt: number = 10
    private static cryptoService: ICryptoService = new BcryptCryptoService()
    private static validRegex : RegExp = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W)[A-Za-z\d\W]{8,}$/)

    protected constructor(
        value: any
    ) {
        super();
        this._value = value
    }

    get value(): string {
        return this._value;
    }

    public static async create(value: any): Promise<Password> {
        this.validate(value)
        return new Password(await this.hash(value, this._salt))
    }

    private static validate(value: any): void {
        if(!value) {
            throw new MissingPasswordError()
        }
        if(!this.validRegex.test(value) || value.length < 8) {
            throw new InvalidPasswordError()
        }
    }

    public async verify(password: any): Promise<boolean> {
        return await Password.cryptoService.handleCompare(password, this._value)
    }

    private static async hash(value: string, salt: number): Promise<string> {
        return await Password.cryptoService.handleHash(value, salt)
    }
}