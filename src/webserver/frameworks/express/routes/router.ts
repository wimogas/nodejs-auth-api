import express from "express";
import userRouter from "./users";
import tokenRouter from "./token";
import rolesRouter from "./roles";
import permissionsRouter from "./permissions";

const router = express.Router()

router.use('/api/v1/users', userRouter);
router.use('/api/v1/token', tokenRouter);
router.use('/api/v1/roles', rolesRouter);
router.use('/api/v1/permissions', permissionsRouter);

export default router;