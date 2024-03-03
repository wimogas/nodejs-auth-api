import AuthValidator from "./AuthValidator";
import IAuthValidator from "../interfaces/IAuthValidator";

export class RegisterValidator extends AuthValidator implements IAuthValidator{
    public validate(request: any): string {

        let validation: string;

        if (!request.name) {
            validation = "Name is required"
        }

        if (!request.email) {
            validation = "Email is required"
        } else if (!this.isValidEmail(request.email)) {
            validation = "Email is not valid"
        }

        if (!request.password) {
            validation = "Password is required"
        } else if (!this.isValidPassword(request.password)) {
            validation = "Password must be at least 6 characters and contain at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 symbol"
        }

        return validation
    }

    private isValidPassword(password: string): boolean {
        const regex =  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W)[A-Za-z\d\W]{6,15}$/;
        return regex.test(password)
    }
}