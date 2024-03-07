import {Request, Response, NextFunction} from 'express'
import {IVerifiedRequest} from "../interfaces/IVerifiedRequest";

export default abstract class VerifiedInput {
    protected req: IVerifiedRequest;
    protected res: Response;
    protected next: NextFunction;

    protected constructor(
        req: IVerifiedRequest,
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