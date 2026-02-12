import { Router } from "express";
import { body } from "express-validator";
import { validate } from "../middleware/validate.js";
import roleController from "../controllers/roleController.js";

const roleRouter = new Router();

// Get all roles
roleRouter.get('/', roleController.getAll);

// Create a new role
roleRouter.post(
  '/',
  body('name')
    .trim()
    .notEmpty()
    .isLength({ min: 3 })
    .withMessage('Role name must be at least 3 characters'),
  validate,
  roleController.create
);
export default roleRouter;
