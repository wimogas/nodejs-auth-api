export class AuthErrors {
    static DuplicateEmail() {
        return {
            status: 409,
            title: "Email already exists"
        }
    }

    static InvalidCredentials() {
        return {
            status: 400,
            title: "Your request parameters didn't validate.",
            detail: "Invalid credentials"
        }
    }

    static InvalidData(error: any) {
        return {
            status: 400,
            title: "Your request parameters didn't validate.",
            "invalid-params": {
                name: error.name,
                reason: error.reason
            }
        }
    }
}