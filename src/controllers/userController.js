import userService from "../services/userService.js";

async function getOne(req, res, next) {
  try {
    const { userId } = req.params;
    console.log(userId);
    const user = await userService.getById(userId);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
}

async function getAll(req, res, next) {
  try {
    const users = await userService.getAll();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
}

async function create(req, res, next) {
  try {
    const { email, name, password } = req.body;
    const newUser = await userService.create({ email, name, password });
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
}
async function update(req, res, next) {
  try {
    const { userId } = req.params;
    const { name, email, password } = req.body;
    const updatedUser = await userService.update(userId, { name, email, password });
    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
}
// Update user role
export default { create, update, getOne, getAll };

