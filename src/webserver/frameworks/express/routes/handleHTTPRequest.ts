import {ICustomRequest} from "../interfaces";
import {Response, NextFunction} from "express";
import {IHTTPRequest} from "../../../../interfaces";

export function handleHTTPRequest(Controller: any, Response: any) {
    return async (req: ICustomRequest, res: Response, next:NextFunction) => {

        const mappedRequest: IHTTPRequest = {
            user: req.user,
            query: req.query,
            params: req.params,
            body: req.body,
            headers: req.headers
        }

        try {
            const response = new Response(res)
            const controller = new Controller()

            const result = await controller.execute(mappedRequest)
            await response.respond(result)

        } catch (error) {
            next(error)
        }
    }
}