import express from "express";
import {CreatedResponse, NoContentResponse, OkResponse,} from "../responses";
import {authenticateMiddleware} from "../middlewares";
import {handleHTTPRequest} from "./handleHTTPRequest";
import {
    CreateRoleController,
    DeleteRoleController,
    GetRoleController,
    UpdateRoleController
} from "../../../../api/controllers/roles";
import {GetRolesController} from "../../../../api/controllers/roles/GetRolesController";

const router = express.Router()

//POST
router.post('/',
    authenticateMiddleware,
    handleHTTPRequest(
        CreateRoleController,
        CreatedResponse
    )
);

//GET
router.get('/:id',
    authenticateMiddleware,
    handleHTTPRequest(
        GetRoleController,
        OkResponse
    )
);

// GET
router.get('/',
    authenticateMiddleware,
    handleHTTPRequest(
        GetRolesController,
        OkResponse
    )
);

//PATCH
router.patch('/:id',
    authenticateMiddleware,
    handleHTTPRequest(
        UpdateRoleController,
        NoContentResponse
    )
);

//DELETE
router.delete('/:id',
    authenticateMiddleware,
    handleHTTPRequest(
        DeleteRoleController,
        NoContentResponse
    )
);

export default router