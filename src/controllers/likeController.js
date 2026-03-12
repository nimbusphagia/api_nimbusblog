import likeService from "../services/likeService.js";

async function toggleOnEntry(req, res, next) {
  try {
    const currentUser = {
      id: req.user.id,
      role: req.user.role,
    };
    const { userId, entryId } = req.params;
    const newLike = await likeService.toggleOnEntry({ entryId, userId, currentUser });
    res.status(201).json(newLike);
  } catch (error) {
    next(error);
  }
}

async function toggleOnComment(req, res, next) {
  try {
    const currentUser = {
      id: req.user.id,
      role: req.user.role,
    };
    const { userId, commentId } = req.params;
    const { liked } = await likeService.toggleOnComment({ commentId, userId, currentUser });
    res.status(201).json(liked);
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

export default { toggleOnComment, toggleOnEntry, getByComment, getByEntry, getById };

