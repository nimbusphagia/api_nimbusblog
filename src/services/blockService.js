import models from "../models/index.js";

const validTypes = ['TEXT', 'IMAGE', 'HEADING'];

async function create({ entryId, blockType, index, currentUser }) {
  // Verify entry exists
  const entry = await models.entry.findById(entryId);
  if (!entry) throw new Error('ENTRY_NOT_FOUND');

  // Verify permission
  const isEntryAuthor = currentUser.id === entry.authorId;
  const isAdmin = currentUser.role === 'ADMIN';
  if (!isEntryAuthor && !isAdmin) throw new Error('ACCESS_DENIED');

  // Verify valid blocktype
  if (!validTypes.includes(blockType)) throw new Error('INVALID_BLOCK_TYPE');

  // Set data (only entryId and blocktype to initialize it)
  const data = {
    entryId,
    blockType,
    index,
  }
  return await models.block.create(data);
}

async function getByEntry(entryId) {
  // Verify entry exists
  const entry = await models.entry.findById(entryId);
  if (!entry) throw new Error('ENTRY_NOT_FOUND');

  const blocks = await models.block.findAll({ entryId });
  return blocks;
}

async function getById(id) {
  const block = await models.block.findById(id);
  if (!block) throw new Error('BLOCK_NOT_FOUND');

  return block;
}

async function getAll({ currentUser }) {
  // Verify permission
  const isAdmin = currentUser.role === 'ADMIN';
  if (!isAdmin) throw new Error('ACCESS_DENIED');

  const blocks = await models.block.findAll();
  return blocks;
}
async function update({ id, input, currentUser }) {
  const { blockType, text, mediaSrc } = input;

  // Validate blockType if provided
  if (blockType && !validTypes.includes(blockType)) {
    throw new Error('INVALID_BLOCK_TYPE');
  }
  // Validate block exists
  const block = await models.block.findById(id);
  if (!block) throw new Error('BLOCK_NOT_FOUND');

  const effectiveBlockType = blockType ?? block.blockType;

  // Validate permission
  const entry = await models.entry.findById(block.entryId);
  if (!entry) throw new Error('ENTRY_NOT_FOUND');

  const isEntryAuthor = currentUser.id === entry.authorId;
  const isAdmin = currentUser.role === 'ADMIN';

  if (!isEntryAuthor && !isAdmin) throw new Error('ACCESS_DENIED');

  const newData = {};

  if (blockType !== undefined) {
    newData.blockType = blockType;
  }

  if (effectiveBlockType === 'TEXT' || effectiveBlockType === 'HEADING') {
    if (text !== undefined) newData.text = text;
  } else if (effectiveBlockType === 'IMAGE') {
    if (mediaSrc !== undefined) newData.mediaSrc = mediaSrc;
  }

  if (Object.keys(newData).length === 0) {
    throw new Error('NO_FIELDS_TO_UPDATE');
  }

  return await models.block.update(id, newData);
}

async function deleteById({ id, currentUser }) {
  const block = await models.block.findById(id);
  if (!block) throw new Error('BLOCK_NOT_FOUND');

  // Validate permission
  const entry = await models.entry.findById(block.entryId);
  if (!entry) throw new Error('ENTRY_NOT_FOUND');

  const isEntryAuthor = currentUser.id === entry.authorId;
  const isAdmin = currentUser.role === 'ADMIN';

  if (!isEntryAuthor && !isAdmin) throw new Error('ACCESS_DENIED');

  return await models.block.deleteById(id);
}


export default { create, getAll, getById, getByEntry, update, deleteById }
