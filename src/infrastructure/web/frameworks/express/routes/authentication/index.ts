import express from 'express'
import RegisterInput from "../../inputs/authentication/RegisterInput";
import LoginInput from "../../inputs/authentication/LoginInput";
import authMiddleware from "../../middlewares/AuthMiddleware";
import {IVerifiedRequest} from "../../interfaces/IVerifiedRequest";

const router = express.Router()

router.get('/verify', authMiddleware.authenticate,
    (
        req: IVerifiedRequest,
        res,
        next) => {
        res.json({
            message: `User has been successfully verified. Id: ${req.userId}`
        })
    })

router.get('/login',
    (
        req,
        res,
        next) => {
        const loginInput = new LoginInput(req, res, next)
        loginInput.execute().catch(console.error)
    })

router.post('/register',
    (
        req,
        res,
        next) => {
        const registerInput = new RegisterInput(req, res, next)
        registerInput.execute().catch(console.error)
    })

export default router