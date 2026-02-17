import models from "../models/index.js";

async function createOnEntry({ entryId, userId, currentUser }) {
  if (currentUser.id !== userId && currentUser.role !== 'ADMIN') throw new Error('ACCESS_DENIED');

  // Verify user 
  const user = await models.user.findById(userId);
  if (!user) throw new Error('USER_NOT_FOUND');
  // Verify entry 
  const entry = await models.entry.findById(entryId);
  if (!entry) throw new Error('ENTRY_NOT_FOUND');

  return await models.like.create({ userId, entryId });
}

async function createOnComment({ commentId, currentUser }) {
  if (!currentUser.id && currentUser.role !== 'ADMIN') throw new Error('ACCESS_DENIED');

  const userId = currentUser.id;
  //Verify Like doesnt exist yet

  // Verify user 
  const user = await models.user.findById(userId);
  if (!user) throw new Error('USER_NOT_FOUND');
  // Verify comment 
  const comment = await models.comment.findById(commentId);
  if (!comment) throw new Error('COMMENT_NOT_FOUND');

  const exists = await models.like.findUnique({ userId_commentId: { userId, commentId } });
  if (exists) throw new Error('LIKE_ALREADY_EXISTS');

  return await models.like.create({ userId, commentId });
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

async function deleteById({ id, currentUser }) {
  const like = await models.like.findById(id);
  if (!like) throw new Error('LIKE_NOT_FOUND');

  if (currentUser.id !== like.userId && currentUser.role !== 'ADMIN') throw new Error('ACCESS_DENIED');

  return await models.like.deleteById(id);
}


export default { createOnEntry, createOnComment, getById, getByComment, getByEntry, deleteById }
