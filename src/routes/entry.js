import { Router } from "express";
import entryController from "../controllers/entryController.js";
import blockRouter from "./block.js";

const entryRouter = new Router({ mergeParams: true });

// Child Blocks Router
entryRouter.use('/:entryId/blocks', blockRouter);
// Get entries by author
entryRouter.get('/', entryController.getByAuthor);
// Create empty entry
entryRouter.post('/', entryController.create);
// Update controller by id
entryRouter.patch('/:entryId', entryController.update);
// Delete controller by id
entryRouter.delete('/:entryId', entryController.deleteById);

export default entryRouter;
