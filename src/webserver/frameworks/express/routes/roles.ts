import express from "express";
import {NoContentResponse, OkResponse,} from "../responses";
import {authenticateMiddleware} from "../middlewares";
import {handleHTTPRequest} from "./handleHTTPRequest";
import {
    CreateRoleController,
    DeleteRoleController,
    GetRoleController,
    UpdateRoleController
} from "../../../../api/controllers/roles";

const router = express.Router()

//POST
router.post('/',
    authenticateMiddleware,
    handleHTTPRequest(
        CreateRoleController,
        NoContentResponse
    )
);

// GET
router.get('/:id',
    handleHTTPRequest(
        GetRoleController,
        OkResponse
    )
);

// PATCH
router.patch('/:id',
    authenticateMiddleware,
    handleHTTPRequest(
        UpdateRoleController,
        NoContentResponse
    )
);

// DELETE
router.delete('/:id',
    authenticateMiddleware,
    handleHTTPRequest(
        DeleteRoleController,
        NoContentResponse
    )
);

export default router