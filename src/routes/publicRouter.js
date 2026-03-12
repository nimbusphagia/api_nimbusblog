import { Router } from "express";
import entryController from "../controllers/entryController.js";
import userController from "../controllers/userController.js";

const publicRouter = new Router();

publicRouter.get('/users/:userId', userController.getById);
publicRouter.get('/users/:userId/entries', entryController.getPublishedByAuthor);
publicRouter.get('/entries/:entryId', entryController.getById);

export default publicRouter;
