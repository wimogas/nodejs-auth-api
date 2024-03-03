export class LoginValidator {
    public validate(request: any): string {

        if (!request.email) {
            return "Email is required"
        } else if (!this.isValidEmail(request.email)) {
            return "Email is not valid"
        }

        if (!request.password) {
            return "Password is required"
        }

        return ''
    }

    private isValidEmail(email: string): boolean {
        const regex =  new RegExp('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')
        return regex.test(email)
    }

}