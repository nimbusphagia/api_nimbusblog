import { Router } from "express";
import entryController from "../controllers/entryController.js";
import blockRouter from "./block.js";

const entryRouter = new Router({ mergeParams: true });

// Blocks Router
entryRouter.use('/:entryId/blocks', blockRouter);

entryRouter.get('/', entryController.getByAuthor);

entryRouter.post('/', entryController.create);

entryRouter.patch('/:entryId', entryController.update);

entryRouter.delete('/:entryId', entryController.deleteById);

export default entryRouter;
