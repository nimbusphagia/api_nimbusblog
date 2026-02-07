import { Router } from "express";
import userController from "../controllers/userController.js";
import { body } from "express-validator";
import { validate } from "../middleware/validate.js";
import { userValidators } from "../middleware/userValidator.js";

const userRouter = new Router();

userRouter.get('/', userController.getAll);

userRouter.post(
  '/',
  userValidators,
  validate,
  userController.create
);

export default userRouter;
