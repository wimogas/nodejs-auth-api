import express from "express";
import {NoContentResponse, } from "../responses";
import {authenticateMiddleware} from "../middlewares";
import {handleHTTPRequest} from "./handleHTTPRequest";
import {CreatePermissionController} from "../../../../features/permission/create-permission/CreatePermissionController";

const router = express.Router()

//POST
router.post('/',
    authenticateMiddleware,
    handleHTTPRequest(
        CreatePermissionController,
        NoContentResponse
    )
);

export default router