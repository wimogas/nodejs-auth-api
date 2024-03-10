import express from "express";
import {NoContentResponse, OkResponse,} from "../responses";
import {authenticateMiddleware} from "../middlewares";
import {handleHTTPRequest} from "./handleHTTPRequest";
import {CreatePermissionController} from "../../../../features/permission/create-permission/CreatePermissionController";
import {DeletePermissionController} from "../../../../features/permission/delete-permission/DeletePermissionController";
import {GetPermissionController} from "../../../../features/permission/get-permission/GetPermissionController";
import {UpdatePermissionController} from "../../../../features/permission/update-permission/UpdatePermissionController";

const router = express.Router()

//POST
router.post('/',
    authenticateMiddleware,
    handleHTTPRequest(
        CreatePermissionController,
        NoContentResponse
    )
);

// GET
router.get('/:id',
    handleHTTPRequest(
        GetPermissionController,
        OkResponse
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

// PATCH
router.patch('/:id',
    authenticateMiddleware,
    handleHTTPRequest(
        UpdatePermissionController,
        NoContentResponse
    )
);

export default router