import {IError} from "./IError";

export abstract class AuthErrors implements IError {
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

    static MissingEmail() {
        return {
            status: 400,
            title: "Your request parameters didn't validate.",
            "invalid-params": {
                name: "email",
                reason: "Email is required"
            }
        }
    }

    static MissingPassword() {
        return {
            status: 400,
            title: "Your request parameters didn't validate.",
            "invalid-params": {
                name: "password",
                reason: "Password is required"
            }
        }
    }

    static InvalidEmail() {
        return {
            status: 400,
            title: "Your request parameters didn't validate.",
            "invalid-params": {
                name: "email",
                reason: "Email is not valid"
            }
        }
    }

    static InvalidPassword() {
        return {
            status: 400,
            title: "Your request parameters didn't validate.",
            "invalid-params": {
                name: "password",
                reason: "Password must be at least 6 characters and contain at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 symbol"
            }
        }
    }

    static Unauthorized() {
        return {
            status: 401,
            title: "Unauthorized.",
        }
    }

    static InvalidToken() {
        return {
            status: 401,
            title: "Unauthorized.",
            detail: "Invalid token."

        }
    }

    static MissingPermissions() {
        return {
            status: 400,
            title: "Your request parameters didn't validate.",
            "invalid-params": {
                name: "Permissions",
                reason: "User doesn't have permission to perform this action"
            }
        }
    }

    static MissingId() {
        return {
            status: 400,
            title: "Your request parameters didn't validate.",
            "invalid-params": {
                name: "Id",
                reason: "Id is required"
            }
        }
    }

    static NotFound() {
        return {
            status: 404,
            title: "Not found",
        }
    }
}