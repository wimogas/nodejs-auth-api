import express from "express";
import {NoContentResponse, } from "../responses";
import {authenticateMiddleware} from "../middlewares";
import {handleHTTPRequest} from "./handleHTTPRequest";
import {CreatePermissionController} from "../../../../features/permission/create-permission/CreatePermissionController";
import {DeletePermissionController} from "../../../../features/permission/delete-permission/DeletePermissionController";

const router = express.Router()

//POST
router.post('/',
    authenticateMiddleware,
    handleHTTPRequest(
        CreatePermissionController,
        NoContentResponse
    )
);

//DELETE
router.delete('/:id',
    authenticateMiddleware,
    handleHTTPRequest(
        DeletePermissionController,
        NoContentResponse
    )
);

export default router