import models from "../models/index.js";

async function create({ authorId, currentUser }) {
  if (currentUser.id !== authorId && currentUser.role !== 'ADMIN') throw new Error('ACCESS_DENIED');
  // Verify author 
  const author = await models.user.findById(authorId);
  if (!author) throw new Error('USER_NOT_FOUND');
  if (author.role !== 'AUTHOR') throw new Error('AUTHOR_NOT_FOUND');

  // Set data (only authorId to initialize it)
  const data = {
    authorId,
  }
  return await models.entry.create(data);
}

async function getByAuthor(authorId) {
  // Verify author 
  const author = await models.user.findById(authorId);
  if (!author) throw new Error('USER_NOT_FOUND');
  if (author.role !== 'AUTHOR') throw new Error('AUTHOR_NOT_FOUND');

  const entries = await models.entry.findAll({ authorId });
  return entries;
}

async function getById(id) {
  const entry = await models.entry.findById(id);
  if (!entry) throw new Error('ENTRY_NOT_FOUND');

  return entry;
}

async function getAll() {
  if (currentUser.role !== 'ADMIN') throw new Error('ACCESS_DENIED');
  const entries = await models.entry.findAll();
  return entries;
}

async function update({ id, title, currentUser }) {
  if (currentUser.id !== id && currentUser.role !== 'ADMIN') throw new Error('ACCESS_DENIED');

  const entry = await models.entry.findById(id);
  if (!entry) throw new Error('ENTRY_NOT_FOUND');

  const data = {};
  if (title !== undefined) data.title = title;

  return await models.entry.update(id, data);
}


async function deleteById({ id, currentUser }) {
  if (currentUser.id !== id && currentUser.role !== 'ADMIN') throw new Error('ACCESS_DENIED');

  const entry = await models.entry.findById(id);
  if (!entry) throw new Error('ENTRY_NOT_FOUND');

  return await models.entry.deleteById(id);
}
async function publish({ id, currentUser }) {
  if (currentUser.id !== id && currentUser.role !== 'ADMIN') throw new Error('ACCESS_DENIED');

  const entry = await models.entry.findById(id);
  if (!entry) throw new Error('ENTRY_NOT_FOUND');

  if (entry.title !== undefined || entry.blocks)
    return await models.entry.update(id, { publishedAt: new Date() })
}

export default { create, getAll, getById, getByAuthor, update, deleteById, publish }
