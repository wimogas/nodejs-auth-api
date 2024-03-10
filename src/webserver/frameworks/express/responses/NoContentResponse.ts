import {Response} from 'express'
import {IResponse} from "../interfaces/IResponse";

export class NoContentResponse implements IResponse {
    private res: Response;

    public constructor(res: Response) {
        this.res = res

    }

    public respond(): void {
        this.res.status(204).json({})
    }
}