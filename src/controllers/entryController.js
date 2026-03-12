import entryService from "../services/entryService.js";

async function create(req, res, next) {
  try {
    const currentUser = {
      id: req.user.id,
      role: req.user.role,
    };
    const { userId } = req.params;
    const newEntry = await entryService.create({ authorId: userId, currentUser });
    res.status(201).json(newEntry);
  } catch (error) {
    next(error);
  }
}
async function getByAuthor(req, res, next) {
  try {
    const { userId } = req.params;
    const { filter } = req.query;

    let entries;
    if (filter === 'mostRecent') {
      entries = await entryService.getMostRecentPublished({ authorId: userId });
    } else if (filter === 'mostLiked') {
      entries = await entryService.getMostLiked({ authorId: userId });
    } else {
      entries = await entryService.getByAuthor(userId);
    }

    res.status(200).json(entries);
  } catch (error) {
    next(error);
  }
}
async function getPublishedByAuthor(req, res, next) {
  try {
    const { userId } = req.params;
    const { filter } = req.query;

    let entries;
    if (filter === 'mostRecent') {
      entries = await entryService.getMostRecentPublished({ authorId: userId });
    } else if (filter === 'mostLiked') {
      entries = await entryService.getMostLiked({ authorId: userId });
    } else {
      entries = await entryService.getByAuthorPublished(userId);
    }

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
    const currentUser = {
      id: req.user.id,
      role: req.user.role,
    };
    const { entryId } = req.params;
    const { title, publishedAt } = req.body;
    const updatedEntry = await entryService.update({ id: entryId, title, currentUser, publishedAt });
    res.status(200).json(updatedEntry);
  } catch (error) {
    next(error);
  }
}
async function deleteById(req, res, next) {
  try {
    const currentUser = {
      id: req.user.id,
      role: req.user.role,
    };
    const { entryId } = req.params;
    await entryService.deleteById({ id: entryId, currentUser });
    return res.status(204).end();
  } catch (error) {
    next(error);
  }
}

export default { create, update, getByAuthor, getPublishedByAuthor, deleteById, getById };

