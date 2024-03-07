export class Error {
    status: number
    title: string
    details?: string

    private constructor(
        status: number,
        title: string,
        details: string,
    ) {
        this.status = status
        this.title = title
        this.details = details
    }

    public static Unauthorized(details: string = "") {
        return new Error(
            401,
            "Unauthorized.",
            details
        )
    }

    public static Validation(details: string = "") {
        return new Error(
            400,
            "Your request parameters didn't validate.",
            details
        )
    }

    public static Conflict(details: string = "") {
        return new Error(
            409,
            "Conflict.",
            details
        )
    }

    public static NotFound(details: string = "") {
        return new Error(
            404,
            "Not Found.",
            details
        )
    }
}