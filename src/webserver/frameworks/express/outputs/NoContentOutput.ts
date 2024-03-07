import {Response} from 'express'
import {IOutput} from "./interfaces/IOutput";

export class NoContentOutput implements IOutput {
    private res: Response;

    public constructor(res: Response) {
        this.res = res

    }

    public respond(): void {
        this.res.status(204).json({})
    }
}