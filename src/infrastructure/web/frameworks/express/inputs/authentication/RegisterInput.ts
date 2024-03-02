import {Request, Response, NextFunction} from 'express'
import IInput from "../interfaces/IInput";
import RegisterController from "../../../../../../api/authentication/controllers/RegisterController";
import {AuthRepository} from "../../../../../database/in-memory/authentication/AuthRepository";
import {CreatedOutput} from "../../outputs/CreatedOutput";

export default class RegisterInput extends IInput {

    public constructor(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        super(req, res, next);
    }

    public async execute() {
        const authRepository = new AuthRepository()

        const response = new CreatedOutput(this.res)

        const request = {
            query: this.req.query,
            params: this.req.params,
            body: this.req.body,
            headers: this.req.headers
        }

        const registerController = new RegisterController(
            authRepository,
            response,
        )

        try {
            await registerController.execute(request)
        } catch (error) {
            this.respondWithError(error)
        }
    }

}