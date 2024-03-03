import {Response} from 'express'
import {IOutput} from "./interfaces/IOutput";

export class CreatedOutput implements IOutput {
    private res: Response;

    public constructor(res: Response) {
        this.res = res

    }

    public respond(result: any): void {
        const {token, ...rest} = result
        if (token) {
            this.res.cookie('jwt', token,{
                httpOnly: true,
                secure: process.env.NODE_ENV !== 'development',
                sameSite: 'strict',
                maxAge: (24 * 60 * 60 * 1000)
            })
        }
        this.res.status(201).send(rest)
    }
}