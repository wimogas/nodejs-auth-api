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
import {GetUsersController} from "../../../../api/controllers/users/GetUsersController";
import {UpdateUserRoleController} from "../../../../api/controllers/users/UpdateUserRoleController";

const router = express.Router()

//POST
router.post('/register',
    handleHTTPRequest(
        CreateUserController,
        CreatedResponse));

//GET
router.get('/:id',
    authenticateMiddleware,
    handleHTTPRequest(
        GetUserController,
        OkResponse));

//GET
router.get('/',
    authenticateMiddleware,
    handleHTTPRequest(
        GetUsersController,
        OkResponse
    )
);

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

//PATCH
router.patch('/:id/role',
    authenticateMiddleware,
    handleHTTPRequest(
        UpdateUserRoleController,
        NoContentResponse));

export default router