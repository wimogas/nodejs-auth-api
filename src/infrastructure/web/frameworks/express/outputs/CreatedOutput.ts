import {Response} from 'express'
import {IOutput} from "./interfaces/IOutput";

export class CreatedOutput implements IOutput {
    private _res: Response;

    public constructor(res: Response) {
        this._res = res

    }

    public respond(result: any): void {
        this._res.status(201).send(result)
    }

}