import { Router } from "express";


const accountCommentRouter = new Router({ mergeParams: true });

// Get all comments by account
accountCommentRouter.get('/');
// Edit own comment
accountCommentRouter.patch('/:commentId');
// Delete own comment
accountCommentRouter.delete('/:commentId');

export default accountCommentRouter;
