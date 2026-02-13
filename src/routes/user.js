import { Router } from "express";
import userController from "../controllers/userController.js";
import { validate } from "../middleware/validate.js";
import { idValidator, dataValidator } from "../middleware/userValidator.js";
import commentController from "../controllers/commentController.js";

const userRouter = new Router();
// Get comments by user
userRouter.get('/comments', commentController.getByUser);

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
// Update user role
userRouter.patch(
  '/:userId/role',
  idValidator,
  validate,
  userController.updateRole
)

// Delete user by id
userRouter.delete('/:userId', idValidator, validate, userController.deleteById);

export default userRouter;
