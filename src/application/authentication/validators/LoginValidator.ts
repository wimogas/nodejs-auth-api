import {IHTTPRequest} from "../../../infrastructure/web/frameworks/express/inputs/interfaces/IHTTPRequest";

export class LoginValidator {
    public validate(request: IHTTPRequest): string {

        if (!request.body.email) {
            return "Email is required"
        } else if (!this.isValidEmail(request.body.email)) {
            return "Email is not valid"
        }

        if (!request.body.password) {
            return "Password is required"
        }

        return ''
    }

    private isValidEmail(email: string): boolean {
        const regex =  new RegExp('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')
        return regex.test(email)
    }

}