import { Router } from "express";
import accountCommentRouter from "./accountComment.js";
import accountEntryRouter from "./accountEntry.js";

const accountRouter = new Router();

// All users 
accountRouter.get('/');
accountRouter.patch('/');
accountRouter.delete('/');

accountRouter.use('/comments', accountCommentRouter);

// Author only
accountRouter.use('/entries', accountEntryRouter);

export default accountRouter;
