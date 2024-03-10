import {Response} from 'express'
import {IResponse} from "../interfaces/IResponse";

export class OkResponse implements IResponse {
    private res: Response;

    public constructor(res: Response) {
        this.res = res

    }

    public respond(result: any): void {
        this.res.status(200).send(result)
    }
}