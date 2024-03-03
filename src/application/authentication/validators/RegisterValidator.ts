export class RegisterValidator {
    public validate(request: any): string {

        if (!request.name) {
            return "Name is required"
        }

        if (!request.email) {
            return "Email is required"
        } else if (!this.isValidEmail(request.email)) {
            return "Email is not valid"
        }

        if (!request.password) {
            return "Password is required"
        } else if (!this.isValidPassword(request.password)) {
            return "Password must be at least 6 characters and contain at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 symbol"
        }

        return ''
    }

    private isValidEmail(email: string): boolean {
        const regex =  new RegExp('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')
        return regex.test(email)
    }

    private isValidPassword(password: string): boolean {
        const regex =  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W)[A-Za-z\d\W]{6,15}$/;
        return regex.test(password)
    }
}