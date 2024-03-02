import {IHTTPRequest} from "../../../infrastructure/web/frameworks/express/inputs/interfaces/IHTTPRequest";

export class RegisterValidator {
    public validate(request: IHTTPRequest): string {

        if (!request.body.name) {
            return "Name is required"
        }
        if (!request.body.email) {
            return "Email is required"
        }
        if (!request.body.password) {
            return "Password is required"
        }
    }
}