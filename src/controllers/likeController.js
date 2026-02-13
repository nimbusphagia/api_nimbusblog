import likeService from "../services/likeService.js";

async function createOnEntry(req, res, next) {
  try {
    const { userId, entryId } = req.params;
    const newLike = await likeService.createOnEntry({ entryId, userId });
    res.status(201).json(newLike);
  } catch (error) {
    next(error);
  }
}
async function createOnComment(req, res, next) {
  try {
    const { userId, commentId } = req.params;
    const newLike = await likeService.createOnComment({ commentId, userId });
    res.status(201).json(newLike);
  } catch (error) {
    next(error);
  }
}
async function getByEntry(req, res, next) {
  try {
    const { entryId } = req.params;
    const likes = await likeService.getByEntry(entryId);
    res.status(200).json(likes);
  } catch (error) {
    next(error);
  }
}
async function getByComment(req, res, next) {
  try {
    const { commentId } = req.params;
    const likes = await likeService.getByComment(commentId);
    res.status(200).json(likes);
  } catch (error) {
    next(error);
  }
}
async function getById(req, res, next) {
  try {
    const { likeId } = req.params;
    const like = await likeService.getById(likeId);
    res.status(200).json(like);
  } catch (error) {
    next(error);
  }
}

async function deleteById(req, res, next) {
  try {
    const { likeId } = req.params;
    await likeService.deleteById(likeId);
    res.status(204);
  } catch (error) {
    next(error);
  }
}

export default { createOnComment, createOnEntry, getByComment, getByEntry, deleteById, getById };

