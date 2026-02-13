import models from "../models/index.js";
/*
model Comment {
  id        String   @id @default(uuid())
  user      User     @relation(fields: [userId], references: [id])
  userId    String
  text      String
  createdAt DateTime @default(now())
  likes     Like[]
}
*/
async function create({ entryId, userId, text }) {
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

async function getByUser(userId) {
  // Verify user 
  const user = await models.user.findById(userId);
  if (!user) throw new Error('USER_NOT_FOUND');

  const comments = await models.comment.findAll({ userId });
  return comments;
}
async function getByEntry(entryId) {
  // Verify entry 
  const entry = await models.entry.findById(entryId);
  if (!entry) throw new Error('ENTRY_NOT_FOUND');

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

async function update(id, text) {
  const comment = await models.comment.findById(id);
  if (!comment) throw new Error('COMMENT_NOT_FOUND');

  // Verify text
  if (!text) throw new Error('INVALID_COMMENT');

  return await models.comment.update({ id, text });
}


async function deleteById(id) {
  const comment = await models.comment.findById(id);
  if (!comment) throw new Error('COMMENT_NOT_FOUND');

  return await models.comment.deleteById(id);
}


export default { create, getAll, getById, getByEntry, getByUser, update, deleteById }
