import blockService from "../services/blockService.js";

async function create(req, res, next) {
  try {
    const { entryId, blockType } = req.body;
    const newBlock = await blockService.create({ entryId, blockType });
    res.status(201).json(newBlock);
  } catch (error) {
    next(error);
  }
}
async function getByEntry(req, res, next) {
  try {
    const { entryId } = req.params;
    const blocks = await blockService.getByEntry(entryId);
    res.status(200).json(blocks);
  } catch (error) {
    next(error);
  }
}

async function getById(req, res, next) {
  try {
    const { blockId } = req.params;
    const block = await blockService.getById(blockId);
    res.status(200).json(block);
  } catch (error) {
    next(error);
  }
}

async function update(req, res, next) {
  try {
    const { blockId } = req.params;
    const { blockType, text, mediaSrc } = req.body;
    const updatedBlock = await blockService.update(blockId, { blockType, text, mediaSrc });
    res.status(200).json(updatedBlock);
  } catch (error) {
    next(error);
  }
}
async function deleteById(req, res, next) {

}
async function reorder(req, res, next) {

}
export default { create, update, getByEntry, deleteById, reorder, getById };

