import {Request, Response, NextFunction} from 'express'
export default class IInput {
    protected req: Request;
    protected res: Response;
    protected next: NextFunction;

    public constructor(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        this.req = req;
        this.res = res;
        this.next = next;
    }

    protected respondWithError(err: any) {
        this.next(err)
    }

}