import {IHTTPRequest} from "../../../infrastructure/web/frameworks/express/inputs/interfaces/IHTTPRequest";

export class RegisterValidator {
    public validate(request: IHTTPRequest) {

        if (!request.body.name) {
            return {
                statusCode: 400,
                message: "Name is required"
            }
        }
        if (!request.body.email) {
            return {
                statusCode: 400,
                message: "Email is required"
            }
        }
        if (!request.body.password) {
            return {
                statusCode: 400,
                message: "Password is required"
            }
        }
    }
}