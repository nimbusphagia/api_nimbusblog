import { Router } from "express";
import { body } from "express-validator";
import { validate } from "../middleware/validate.js";
import roleController from "../controllers/roleController.js";

const roleRouter = new Router();
roleRouter.get(
  '/',
  roleController.getAll
);

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
