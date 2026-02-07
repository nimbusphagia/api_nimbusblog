import role from "../services/roleService.js";

async function getAll(req, res) {
  const roles = await role.findAll();
  res.status(201).json(roles);
}
async function create(req, res, next) {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({
        message: 'Name is required',
      })
    }
    const newRole = await role.create(name);
    res.status(201).json(newRole);

  } catch (err) {
    next(err);
  }

}

export default { create, getAll }
