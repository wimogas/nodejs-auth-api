import {Request, Response, NextFunction} from 'express'

export default abstract class Input {
    protected req: Request;
    protected res: Response;
    protected next: NextFunction;

    protected constructor(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        this.req = req;
        this.res = res;
        this.next = next;
    }

    public abstract execute(): Promise<void>;

    protected respondWithError(err: any) {
        this.next(err)
    }

}