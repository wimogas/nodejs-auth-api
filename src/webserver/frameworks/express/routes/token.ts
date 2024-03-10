import {OkResponse} from "../responses";
import express from "express";
import {handleHTTPRequest} from "./handleHTTPRequest";
import {GetTokenController} from "../../../../api/controllers/tokens";

const router = express.Router()

router.get('/',
    handleHTTPRequest(
    GetTokenController,
    OkResponse));

export default router