import { Router } from "express";
import passport from "../../config/passport.js";
import roleRouter from "./role.js";
import userRouter from "./user.js";
import authRouter from "./auth.js";
import entryRouter from "./entry.js";

const router = new Router();

router.use('/auth', authRouter);

router.use(passport.authenticate("jwt", { session: false }));
router.use('/roles', roleRouter);
router.use('/users', userRouter);
router.use('/users/:userId/entries', entryRouter); // Nested inside is blocks Router

export default router;
