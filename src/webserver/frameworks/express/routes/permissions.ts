import express from "express";
import {NoContentResponse, OkResponse,} from "../responses";
import {authenticateMiddleware} from "../middlewares";
import {handleHTTPRequest} from "./handleHTTPRequest";
import {
    CreatePermissionController,
    DeletePermissionController,
    GetPermissionController, UpdatePermissionController
} from "../../../../api/controllers/permissions";

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