import models from "../models/index.js";

async function create({ entryId, userId, text, currentUser }) {
  if (currentUser.id !== userId && currentUser.role !== 'ADMIN') throw new Error('ACCESS_DENIED');

  // Verify user 
  const user = await models.user.findById(userId);
  if (!user) throw new Error('USER_NOT_FOUND');
  // Verify entry 
  const entry = await models.entry.findById(entryId);
  if (!entry) throw new Error('ENTRY_NOT_FOUND');

  // Verify text
  if (!text) throw new Error('INVALID_COMMENT');

  return await models.comment.create({ entryId, userId, text });
}

async function getByUser({ userId }) {

  // Verify user 
  const user = await models.user.findById(userId);
  if (!user) throw new Error('USER_NOT_FOUND');

  const comments = await models.comment.findAll({ userId });
  return comments;
}
async function getByEntry(entryId) {
  // Verify entry const entry = await models.entry.findById(entryId); if (!entry) throw new Error('ENTRY_NOT_FOUND');

  const comments = await models.comment.findAll({ entryId });
  return comments;
}
async function getById(id) {
  const comment = await models.comment.findById(id);
  if (!comment) throw new Error('COMMENT_NOT_FOUND');

  return comment;
}

async function getAll() {
  const comments = await models.comment.findAll();
  return comments;
}

async function update({ id, text, currentUser }) {
  if (!text || !text.trim()) throw new Error('INVALID_COMMENT');

  const comment = await models.comment.findById(id);
  if (!comment) throw new Error('COMMENT_NOT_FOUND');

  if (currentUser.id !== comment.userId && currentUser.role !== 'ADMIN') throw new Error('ACCESS_DENIED');
  return await models.comment.update({
    id,
    text: text.trim(),
  });
}

async function deleteById({ id, currentUser }) {
  const comment = await models.comment.findById(id);
  if (!comment) throw new Error('COMMENT_NOT_FOUND');

  const entry = await models.entry.findById(comment.entryId);
  if (!entry) throw new Error('ENTRY_NOT_FOUND');


  const isCommentAuthor = currentUser.id === comment.userId;
  const isEntryAuthor = currentUser.id === entry.authorId;
  const isAdmin = currentUser.role === 'ADMIN';

  if (!isCommentAuthor && !isEntryAuthor && !isAdmin) throw new Error('ACCESS_DENIED');

  return await models.comment.deleteById(id);
}

export default { create, getAll, getById, getByEntry, getByUser, update, deleteById }
