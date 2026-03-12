import models from "../models/index.js";

async function toggleOnEntry({ entryId, currentUser }) {
  if (!currentUser.id && currentUser.role !== 'ADMIN') throw new Error('ACCESS_DENIED');
  const userId = currentUser.id;

  const user = await models.user.findById(userId);
  if (!user) throw new Error('USER_NOT_FOUND');

  const entry = await models.entry.findById(entryId);
  if (!entry) throw new Error('ENTRY_NOT_FOUND');

  const existing = await models.like.findUnique({ userId_entryId: { userId, entryId } });
  if (existing) {
    await models.like.deleteById(existing.id);
    return { liked: false };
  }

  await models.like.create({ userId, entryId });
  return { liked: true };
}

async function toggleOnComment({ commentId, currentUser }) {
  if (!currentUser.id && currentUser.role !== 'ADMIN') throw new Error('ACCESS_DENIED');
  const userId = currentUser.id;

  const user = await models.user.findById(userId);
  if (!user) throw new Error('USER_NOT_FOUND');

  const comment = await models.comment.findById(commentId);
  if (!comment) throw new Error('COMMENT_NOT_FOUND');

  const existing = await models.like.findUnique({ userId_commentId: { userId, commentId } });
  if (existing) {
    await models.like.deleteById(existing.id);
    return { liked: false };
  }

  await models.like.create({ userId, commentId });
  return { liked: true };
}
async function getByComment(commentId) {
  // Verify comment 
  const comment = await models.comment.findById(commentId);
  if (!comment) throw new Error('COMMENT_NOT_FOUND');

  const likes = await models.like.findByComment(commentId);
  return likes;
}
async function getByEntry(entryId) {
  // Verify entry 
  const entry = await models.entry.findById(entryId);
  if (!entry) throw new Error('ENTRY_NOT_FOUND');

  const likes = await models.like.findByEntry(entryId);
  return likes;
}
async function getById(id) {
  const like = await models.like.findById(id);
  if (!like) throw new Error('LIKE_NOT_FOUND');

  return like;
}



export default { toggleOnEntry, toggleOnComment, getById, getByComment, getByEntry }
