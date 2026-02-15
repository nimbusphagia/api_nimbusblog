import { Router } from "express";

const accountEntryRouter = new Router({ mergeParams: true });
// Get account entries
accountEntryRouter.get('/');

// Update own entry
accountEntryRouter.patch('/:entryId');
// Delete own entry
accountEntryRouter.delete('/:entryId');

export default accountEntryRouter;
