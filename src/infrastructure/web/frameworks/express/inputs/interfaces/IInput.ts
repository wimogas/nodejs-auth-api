import {Request, Response, NextFunction} from 'express'
import Input from "../Input";

export interface IInput {
    new (req: Request, res: Response, next: NextFunction): Input;
}