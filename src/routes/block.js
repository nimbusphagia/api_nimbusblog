import { Router } from "express";
import blockController from "../controllers/blockController.js";

const blockRouter = new Router({ mergeParams: true });

// Get blocks by Entry
blockRouter.get('/', blockController.getByEntry);
// Create block in entry
blockRouter.post('/', blockController.create);
// Update block by id
blockRouter.patch('/:blockId', blockController.update);
// Delete by id
blockRouter.delete('/:blockId', blockController.deleteById);

export default blockRouter;
