import express from "express";
import {CreatedResponse, NoContentResponse, OkResponse,} from "../responses";
import {authenticateMiddleware} from "../middlewares";
import {handleHTTPRequest} from "./handleHTTPRequest";
import {
    CreatePermissionController,
    DeletePermissionController,
    GetPermissionController, UpdatePermissionController
} from "../../../../api/controllers/permissions";
import {GetPermissionsController} from "../../../../api/controllers/permissions/GetPermissionsController";

const router = express.Router()

//POST
router.post('/',
    authenticateMiddleware,
    handleHTTPRequest(
        CreatePermissionController,
        CreatedResponse
    )
);

// GET
router.get('/:id',
    authenticateMiddleware,
    handleHTTPRequest(
        GetPermissionController,
        OkResponse
    )
);

// GET
router.get('/',
    authenticateMiddleware,
    handleHTTPRequest(
        GetPermissionsController,
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