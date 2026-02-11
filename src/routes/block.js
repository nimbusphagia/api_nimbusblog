import { Router } from "express";
import blockController from "../controllers/blockController.js";

const blockRouter = new Router();

blockRouter.get('/:entryId', blockController.getByEntry);

blockRouter.post('/:entryId', blockController.create);

blockRouter.patch('/:blockId', blockController.update);

blockRouter.delete('/:blockId', blockController.deleteById);

export default blockRouter;
