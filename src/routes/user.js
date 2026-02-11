import { Router } from "express";
import userController from "../controllers/userController.js";
import { validate } from "../middleware/validate.js";
import { idValidator, dataValidator } from "../middleware/userValidator.js";

const userRouter = new Router();
// GET
userRouter.get('/', userController.getAll);

userRouter.get(
  '/:userId',
  idValidator,
  validate,
  userController.getOne);

// POST
userRouter.post(
  '/',
  dataValidator,
  validate,
  userController.create
);

// PATCH
userRouter.patch(
  '/:userId',
  idValidator,
  dataValidator,
  validate,
  userController.update
)

// DELETE

export default userRouter;
