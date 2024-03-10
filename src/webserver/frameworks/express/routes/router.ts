import express from "express";
import userRouter from "./users";
import tokenRouter from "./token";
import authRouter from "./auth";

const router = express.Router()

router.use('/api/v1/user', userRouter);
router.use('/api/v1/token', tokenRouter);
router.use('/api/v1/auth', authRouter);

export default router;