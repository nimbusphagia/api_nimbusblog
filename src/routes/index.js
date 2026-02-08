import { Router } from "express";
import roleRouter from "./role.js";
import userRouter from "./user.js";
import authRouter from "./auth.js";
import passport from "../../config/passport.js";

const router = new Router();

router.use('/auth', authRouter);

router.use(passport.authenticate("jwt", { session: false }));
router.use('/role', roleRouter);
router.use('/users', userRouter);

export default router;
