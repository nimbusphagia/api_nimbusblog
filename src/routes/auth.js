import { Router } from "express";
import { login } from "../controllers/authController.js";
import { loginValidator } from "../middleware/userValidator.js";
import { validate } from "../middleware/validate.js";

const authRouter = new Router();

authRouter.post(
  '/',
  loginValidator,
  validate,
  login
)

export default authRouter;
