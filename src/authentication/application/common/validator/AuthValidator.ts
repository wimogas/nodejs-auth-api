import IValidator from "../interfaces/IValidator";
import {Error} from "../../../domain/errors/Error";
import {IHTTPRequest} from "../interfaces/IHTTPRequest";

export default abstract class AuthValidator implements IValidator {

    abstract validate(req: IHTTPRequest): Error | null
    protected isValidEmail(email: string): boolean {
        const regex =  new RegExp('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')
        return regex.test(email)
    }
}