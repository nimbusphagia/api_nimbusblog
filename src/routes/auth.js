import { Router } from "express";
import { login } from "../controllers/authController.js";
import { userValidator } from "../middleware/userValidator.js";
import { validate } from "../middleware/validate.js";

const authRouter = new Router();

authRouter.post(
  '/',
  userValidator,
  validate,
  login
)

export default authRouter;
