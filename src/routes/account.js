import { Router } from "express";

const accountRouter = new Router();

// User 

accountRouter.get('/');
accountRouter.patch('/');
accountRouter.delete('/');

accountRouter.get('/comments');
accountRouter.get('/comments/:commentId');
accountRouter.post('/comments');
accountRouter.patch('/comments/:commentId');
accountRouter.delete('/comments/:commentId');

accountRouter.get('/entries');
accountRouter.get('/entries/:entryId');
accountRouter.post('/entries');
accountRouter.patch('/entries/:entryId');
accountRouter.delete('/entries/:entryId');

export default accountRouter;
