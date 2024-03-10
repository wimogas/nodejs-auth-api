import express from "express";

import {CreatedResponse, NoContentResponse, OkResponse} from "../responses";
import {authenticateMiddleware} from "../middlewares";
import {handleHTTPRequest} from "./handleHTTPRequest";
import {
    CreateUserController,
    DeleteUserController,
    GetUserController,
    UpdateUserController
} from "../../../../api/controllers/users";

const router = express.Router()

router.post('/register',
    handleHTTPRequest(
        CreateUserController,
        CreatedResponse));

//GET
router.get('/:id',
    handleHTTPRequest(
        GetUserController,
        OkResponse));

//DELETE

router.delete('/:id',
    authenticateMiddleware,
    handleHTTPRequest(
        DeleteUserController,
        NoContentResponse));

//PATCH

router.patch('/:id',
    authenticateMiddleware,
    handleHTTPRequest(
        UpdateUserController,
        NoContentResponse));

export default router