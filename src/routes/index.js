import { Router } from "express";
import passport from "../../config/passport.js";
import userRouter from "./user.js";
import authRouter from "./auth.js";
import entryRouter from "./entry.js";
import { dataValidator } from "../middleware/userValidator.js";
import { validate } from "../middleware/validate.js";
import userController from "../controllers/userController.js";
//import accountRouter from "./account.js";

const router = new Router();

// Sign up
router.post(
  '/signup',
  dataValidator,
  validate,
  userController.create
);

// Login
router.use('/auth', authRouter);

// JWT
router.use(passport.authenticate("jwt", { session: false }));

//router.use('/account', accountRouter);
router.use('/users', userRouter);
router.use('/users/:userId/entries', entryRouter); // Nested inside is blocks Router

export default router;
