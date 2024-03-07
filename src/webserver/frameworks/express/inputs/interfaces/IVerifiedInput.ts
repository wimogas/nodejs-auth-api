import {Request, Response, NextFunction} from 'express'
import Input from "../Input";
import {IVerifiedRequest} from "../../interfaces/IVerifiedRequest";
import VerifiedInput from "../VerifiedInput";

export interface IVerifiedInput {
    new (req: IVerifiedRequest, res: Response, next: NextFunction): VerifiedInput;
}