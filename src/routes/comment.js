import { Router } from "express";
import commentController from "../controllers/commentController.js";

const commentRouter = new Router({ mergeParams: true });
// Get comments by Entry
commentRouter.get('/', commentController.getByEntry);
// Create comment in entry
commentRouter.post('/', commentController.create);
// Update comment by id
commentRouter.patch('/:commentId', commentController.update);
// Delete by id
commentRouter.delete('/:commentId', commentController.deleteById);


export default commentRouter;
