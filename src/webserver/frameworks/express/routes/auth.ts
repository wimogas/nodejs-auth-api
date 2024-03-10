import express from "express";

import {NoContentResponse, } from "../responses";
import {SeedAuthController} from "../../../../features/auth/seed-auth/SeedAuthController";
import {UpdateRoleController} from "../../../../features/auth/update-role/UpdateRoleController";
import {authenticateMiddleware} from "../middlewares";
import {handleHTTPRequest} from "./handleHTTPRequest";

const router = express.Router()

//POST
router.post('/',
    authenticateMiddleware,
    handleHTTPRequest(
        SeedAuthController,
        NoContentResponse
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