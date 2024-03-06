import {Response} from 'express'
import {IOutput} from "./interfaces/IOutput";

export class OkOutput implements IOutput {
    private res: Response;

    public constructor(res: Response) {
        this.res = res

    }

    public respond(result: any): void {
        this.res.status(200).send(result)
    }
}