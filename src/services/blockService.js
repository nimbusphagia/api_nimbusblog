import models from "../models/index.js";

const validTypes = ['TEXT', 'IMAGE', 'HEADING'];
async function create({ entryId, blockType }) {
  // Verify entry exists
  const entry = await models.entry.findById(entryId);
  if (!entry) throw new Error('ENTRY_NOT_FOUND');

  // Verify valid blocktype
  if (!validTypes.includes(blockType)) throw new Error('INVALID_BLOCK_TYPE');

  // Set data (only entryId and blocktype to initialize it)
  const data = {
    entryId,
    blockType,
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

async function getAll() {
  const blocks = await models.block.findAll();
  return blocks;
}
async function update(id, input) {
  const { blockType, text, mediaSrc } = input;

  // Verify valid blocktype
  if (blockType && !validTypes.includes(blockType)) {
    throw new Error('INVALID_BLOCK_TYPE');
  }

  const block = await models.block.findById(id);
  if (!block) throw new Error('BLOCK_NOT_FOUND');

  const newData = {};
  if (blockType !== undefined) newData.blockType = blockType;
  if (text !== undefined) newData.text = text;
  if (mediaSrc !== undefined) newData.mediaSrc = mediaSrc;
  if (Object.keys(newData).length === 0) throw new Error('NO_FIELDS_TO_UPDATE');
  return await models.block.update(id, newData);
}
async function deleteById(id) {
  const block = await models.block.findById(id);
  if (!block) throw new Error('BLOCK_NOT_FOUND');

  return await models.block.deleteById(id);
}


export default { create, getAll, getById, getByEntry, update, deleteById }
