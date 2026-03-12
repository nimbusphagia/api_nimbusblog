import { Router } from "express";
import likeController from "../controllers/likeController.js";

const commentLikeRouter = new Router({ mergeParams: true });
//
// Get likes by comment
commentLikeRouter.get('/', likeController.getByComment);

// Create a like
commentLikeRouter.post('/', likeController.toggleOnComment);



export default commentLikeRouter;
