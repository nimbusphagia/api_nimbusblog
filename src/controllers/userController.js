import userService from "../services/userService.js";

async function getAll(req, res, next) {
  try {
    const users = await userService.getAll();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
}

async function create(req, res, next) {
  try {
    const { email, name, password } = req.body;

    const newUser = await userService.create({ email, name, password });

    res.status(201).json(newUser);
  } catch (err) {
    next(err);
  }
}

export default { create, getAll };

