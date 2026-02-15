import userService from "../services/userService.js";

async function getOne(req, res, next) {
  try {
    const currentUser = {
      id: req.user.id,
      role: req.user.role,
    };
    const { userId } = req.params;
    const user = await userService.getById({ id: userId, currentUser });
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
}

async function getAll(req, res, next) {
  try {
    const currentUser = {
      id: req.user.id,
      role: req.user.role,
    };
    const users = await userService.getAll({ currentUser });
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
    const currentUser = {
      id: req.user.id,
      role: req.user.role,
    };
    const { userId } = req.params;
    const { name, email, password } = req.body;
    const updatedUser = await userService.update({ id: userId, input: { name, email, password }, currentUser });
    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
}
async function updateRole(req, res, next) {
  try {
    const { userId } = req.params;
    const { role } = req.body;
    const updatedUser = await userService.updateRole({ id: userId, role, currentUser: req.user });
    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
}
async function deleteById(req, res, next) {
  try {
    const { userId } = req.params;
    await userService.deleteById({ id: userId, currentUser: req.user });
    res.status(200).json({
      'message': 'User deleted succesfully'
    });
  } catch (error) {
    next(error);
  }
}
export default { create, update, updateRole, getOne, getAll, deleteById };

