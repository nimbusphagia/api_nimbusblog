import Role from '../models/role.js';
async function findAll() {
  return await Role.findAll();
}
async function create(name) {
  const existing = await Role.findOne(name);

  if (existing) {
    throw new Error('ROLE_EXISTS');
  }
  return await Role.create(name);
}

export default { create, findAll }
