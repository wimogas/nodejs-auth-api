import {Request} from "express";

export interface IVerifiedRequest extends Request {
    userId: string
}
