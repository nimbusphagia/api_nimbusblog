import { Router } from "express";
import userController from "../controllers/userController.js";
import { validate } from "../middleware/validate.js";
import { idValidator, dataValidator } from "../middleware/userValidator.js";

const userRouter = new Router();
// Get all users
userRouter.get('/', userController.getAll);

// Get user by id
userRouter.get(
  '/:userId',
  idValidator,
  validate,
  userController.getOne);

// Create user
userRouter.post(
  '/',
  dataValidator,
  validate,
  userController.create
);

// Update user by id
userRouter.patch(
  '/:userId',
  idValidator,
  dataValidator,
  validate,
  userController.update
)

// Delete user by id
userRouter.delete('/:userId', idValidator, validate, userController.deleteById);

export default userRouter;
