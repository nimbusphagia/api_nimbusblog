import commentService from "../services/commentService.js";

async function create(req, res, next) {
  try {
    const { userId, entryId } = req.params;
    const { text } = req.body;
    const newComment = await commentService.create({ entryId, userId, text });
    res.status(201).json(newComment);
  } catch (error) {
    next(error);
  }
}
async function getByEntry(req, res, next) {
  try {
    const { entryId } = req.params;
    const comments = await commentService.getByEntry(entryId);
    res.status(200).json(comments);
  } catch (error) {
    next(error);
  }
}
async function getByUser(req, res, next) {
  try {
    const { userId } = req.params;
    const comments = await commentService.getByUser(userId);
    res.status(200).json(comments);
  } catch (error) {
    next(error);
  }
}
async function getById(req, res, next) {
  try {
    const { commentId } = req.params;
    const comment = await commentService.getById(commentId);
    res.status(200).json(comment);
  } catch (error) {
    next(error);
  }
}

async function update(req, res, next) {
  try {
    const { commentId } = req.params;
    const { text } = req.body;
    const updatedComment = await commentService.update(commentId, text);
    res.status(200).json(updatedComment);
  } catch (error) {
    next(error);
  }
}
async function deleteById(req, res, next) {
  try {
    const { commentId } = req.params;
    await commentService.deleteById(commentId);
    res.status(204);
  } catch (error) {
    next(error);
  }
}

export default { create, update, getByUser, getByEntry, deleteById, getById };

