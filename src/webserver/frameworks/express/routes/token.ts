import {OkResponse} from "../responses";
import express from "express";
import {GetTokenController} from "../../../../features/tokens";
import {handleHTTPRequest} from "./handleHTTPRequest";

const router = express.Router()

router.get('/',
    handleHTTPRequest(
    GetTokenController,
    OkResponse));

export default router