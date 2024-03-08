import {MissingPasswordError} from "../errors/MissingPasswordError";
import {InvalidPasswordError} from "../errors/InvalidPasswordError";
import {ValueObject} from "../../../common/domain/models/ValueObject";
import {ICryptoService} from "../crypto-service/ICryptoService";
import {BcryptCryptoService} from "../crypto-service/BcryptCryptoService";


export class Password extends ValueObject {
    private readonly _value: string
    private static _salt: number = 10
    private static cryptoService: ICryptoService = new BcryptCryptoService()
    private static validRegex : RegExp = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W)[A-Za-z\d\W]$/)

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
        await this.validate(value)
        return new Password(await this.hash(value, this._salt))
    }

    private static async validate(value: any): Promise<void> {
        if(!value) {
            throw new MissingPasswordError()
        }
        if(!this.validRegex.test(value) && value.length < 6) {
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