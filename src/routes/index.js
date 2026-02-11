import { Router } from "express";
import passport from "../../config/passport.js";
import roleRouter from "./role.js";
import userRouter from "./user.js";
import authRouter from "./auth.js";
import entryRouter from "./entry.js";
import blockRouter from "./block.js";

const router = new Router();

router.use('/auth', authRouter);

router.use(passport.authenticate("jwt", { session: false }));
router.use('/role', roleRouter);
router.use('/users', userRouter);
router.use('/entries', entryRouter);
router.use('/blocks', blockRouter);

export default router;
