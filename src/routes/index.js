import { Router } from "express";
import passport from "../../config/passport.js";
import userRouter from "./user.js";
import authRouter from "./auth.js";
import entryRouter from "./entry.js";
import { signupValidator } from "../middleware/userValidator.js";
import { validate } from "../middleware/validate.js";
import userController from "../controllers/userController.js";
import publicRouter from "./publicRouter.js";

const router = new Router();

// Sign up
router.post('/signup', signupValidator, validate, userController.create);

router.use('/public', publicRouter);

// Login
router.use('/auth', authRouter);

// JWT
router.use(passport.authenticate("jwt", { session: false }));

router.get('/me', userController.getMe);
router.use('/users', userRouter);
router.use('/users/:userId/entries', entryRouter); // Nested inside is blocks Router

export default router;
