import models from "../models/index.js";
/*
model Like {
  id        String   @id @default(uuid())
  user      User     @relation(fields: [userId], references: [id])
  userId    String
  entry     Entry?   @relation(fields: [entryId], references: [id])
  entryId   String?
  comment   Comment? @relation(fields: [commentId], references: [id])
  commentId String?
  createdAt DateTime @default(now())

  @@unique([userId, entryId])
  @@unique([userId, commentId])
}
*/

async function createOnEntry({ entryId, userId }) {
  // Verify user 
  const user = await models.user.findById(userId);
  if (!user) throw new Error('USER_NOT_FOUND');
  // Verify entry 
  const entry = await models.entry.findById(entryId);
  if (!entry) throw new Error('ENTRY_NOT_FOUND');

  return await models.like.create({ userId, entryId });
}
async function createOnComment({ commentId, userId }) {
  // Verify user 
  const user = await models.user.findById(userId);
  if (!user) throw new Error('USER_NOT_FOUND');
  // Verify comment 
  const comment = await models.comment.findById(commentId);
  if (!comment) throw new Error('COMMENT_NOT_FOUND');

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

async function deleteById(id) {
  const like = await models.like.findById(id);
  if (!like) throw new Error('LIKE_NOT_FOUND');

  return await models.like.deleteById(id);
}


export default { createOnEntry, createOnComment, getById, getByComment, getByEntry, deleteById }
