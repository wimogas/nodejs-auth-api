import express from 'express'
import RegisterInput from "../../inputs/authentication/RegisterInput";

const router = express.Router()

router.post('/register',
    (
        req,
        res,
        next) => {
        const registerInput = new RegisterInput(req, res, next)
        registerInput.execute().then()
    })

export default router