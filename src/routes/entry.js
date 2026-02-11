import { Router } from "express";
import entryController from "../controllers/entryController.js";

const entryRouter = new Router();

entryRouter.get('/:authorId', entryController.getByAuthor);

entryRouter.post('/:authorId', entryController.create);

entryRouter.patch('/:entryId', entryController.update);

entryRouter.delete('/:entryId', entryController.deleteById);

export default entryRouter;
