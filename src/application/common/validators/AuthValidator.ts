import IValidator from "./interfaces/IValidator";

export default abstract class AuthValidator implements IValidator{

    abstract validate(req: any): any
    protected isValidEmail(email: string): boolean {
        const regex =  new RegExp('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')
        return regex.test(email)
    }
}