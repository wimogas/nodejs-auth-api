import {Request} from "express";

export interface IVerifiedRequest extends Request {
    user: any
}
