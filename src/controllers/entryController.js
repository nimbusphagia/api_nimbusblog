import entryService from "../services/entryService.js";

async function create(req, res, next) {
  try {
    const { authorId } = req.params;
    const newEntry = await entryService.create({ authorId });
    res.status(201).json(newEntry);
  } catch (error) {
    next(error);
  }
}
async function getByAuthor(req, res, next) {
  try {
    const { authorId } = req.params;
    const entries = await entryService.getByAuthor(authorId);
    res.status(200).json(entries);
  } catch (error) {
    next(error);
  }
}

async function getById(req, res, next) {
  try {
    const { entryId } = req.params;
    const entry = await entryService.getById(entryId);
    res.status(200).json(entry);
  } catch (error) {
    next(error);
  }
}

async function update(req, res, next) {
  try {
    const { entryId } = req.params;
    const { title } = req.body;
    // Not passing Blocks Array because blocks should be created with an entryId already, 
    // even when editing, no need to directly move a block to an entry
    const updatedEntry = await entryService.update(entryId, { title });
    res.status(200).json(updatedEntry);
  } catch (error) {
    next(error);
  }
}
async function deleteById(req, res, next) {
  try {
    const { entryId } = req.params;
    await entryService.deleteById(entryId);
    res.status(204);
  } catch (error) {
    next(error);
  }
}
async function reorderBlocks(req, res, next) {

}
export default { create, update, getByAuthor, deleteById, getById };

