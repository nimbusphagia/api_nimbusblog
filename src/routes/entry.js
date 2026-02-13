import { Router } from "express";
import entryController from "../controllers/entryController.js";
import blockRouter from "./block.js";
import commentRouter from "./comment.js";
import entryLikeRouter from "./entryLike.js";

const entryRouter = new Router({ mergeParams: true });

// Child Router
entryRouter.use('/:entryId/blocks', blockRouter);
entryRouter.use('/:entryId/comments', commentRouter);
entryRouter.use('/:entryId/likes', entryLikeRouter);
// Get entries by author
entryRouter.get('/', entryController.getByAuthor);
// Create empty entry
entryRouter.post('/', entryController.create);
// Update controller by id
entryRouter.patch('/:entryId', entryController.update);
// Delete controller by id
entryRouter.delete('/:entryId', entryController.deleteById);

export default entryRouter;
