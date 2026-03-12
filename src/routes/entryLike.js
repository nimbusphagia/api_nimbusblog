import { Router } from "express";
import likeController from "../controllers/likeController.js";

const entryLikeRouter = new Router({ mergeParams: true });

// Get likes by entry
entryLikeRouter.get('/', likeController.getByEntry);

// Create a like
entryLikeRouter.post('/', likeController.toggleOnEntry);


export default entryLikeRouter;
