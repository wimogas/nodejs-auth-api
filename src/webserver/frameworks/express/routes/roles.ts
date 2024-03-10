import express from "express";
import {NoContentResponse, OkResponse,} from "../responses";
import {authenticateMiddleware} from "../middlewares";
import {handleHTTPRequest} from "./handleHTTPRequest";
import {CreateRoleController} from "../../../../features/role/create-role/CreateRoleController";
import {UpdateRoleController} from "../../../../features/role/update-role/UpdateRoleController";
import {GetRoleController} from "../../../../features/role/get-role/GetRoleController";

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

export default router