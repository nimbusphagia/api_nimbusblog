import { Router } from "express";
import roleRouter from "./role.js";
import userRouter from "./user.js";


const router = new Router();

//Maybe better optional
router.use('/role', roleRouter);
router.use('/user', userRouter);

export default router;
