import models from "../models/index.js";
/*
 model Entry {
  id          String    @id @default(uuid())
  title       String
  author      User      @relation(fields: [authorId], references: [id])
  authorId    String
  blocks      Block[]
  createdAt   DateTime  @default(now())
  publishedAt DateTime?
  likes       Like[]
}
 */
async function create({ authorId }) {
  // Verify author 
  const author = await models.user.findById(authorId);
  if (!author) throw new Error('AUTHOR_NOT_FOUND');
  if (author.role.name !== 'author') throw new Error('INVALID_CREDENTIALS');

  // Set data (only authorId to initialize it)
  const data = {
    authorId,
  }
  return await models.entry.create(data);
}

async function getByAuthor(authorId) {
  // Verify author 
  const author = await models.user.findById(authorId);
  if (!author) throw new Error('AUTHOR_NOT_FOUND');
  if (author.role.name !== 'author') throw new Error('INVALID_CREDENTIALS');

  const entries = await models.entry.findAll({ authorId });
  return entries;
}

async function getById(id) {
  const entry = await models.entry.findById(id);
  if (!entry) throw new Error('ENTRY_NOT_FOUND');

  return entry;
}

async function getAll() {
  const entries = await models.entry.findAll();
  return entries;
}

async function update(id, input) {
  const { title, blocks } = input;

  if (blocks !== undefined && !Array.isArray(blocks)) {
    throw new Error('INVALID_BLOCK_ARRAY');
  }

  const entry = await models.entry.findById(id);
  if (!entry) throw new Error('ENTRY_NOT_FOUND');

  if (Array.isArray(blocks) && blocks.length > 0) {
    await models.entry.updateBlocks(id, blocks);
  }

  const data = {};
  if (title !== undefined) data.title = title;

  return await models.entry.update(id, data);
}


async function deleteById(id) {
  const entry = await models.entry.findById(id);
  if (!entry) throw new Error('ENTRY_NOT_FOUND');

  return await models.entry.deleteById(id);
}
async function publish(id) {
  return await models.entry.update(id, { publishedAt: new Date() })
}

export default { create, getAll, getById, getByAuthor, update, deleteById, publish }
