import express from 'express'
import RegisterInput from "../../inputs/authentication/RegisterInput";
import LoginInput from "../../inputs/authentication/LoginInput";

const router = express.Router()

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