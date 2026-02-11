import Role from '../models/role.js';
async function findAll() {
  return await Role.findAll();
}
async function create(name) {
  const existing = await Role.find(name);

  if (existing) {
    throw new Error('ROLE_EXISTS');
  }
  return await Role.create(name);
}
async function deleteRole(name) {
  const role = await Role.find(name);
  if (!role) {
    throw new Error('ROLE_NOT_FOUND');
  }
  return await Role.deleteById(role.id);
}
async function rename(id, newName) {
  const role = await Role.findById(id);
  if (!role) {
    throw new Error('ROLE_NOT_FOUND');
  }
  return await Role.update({ id, newName });

}
export default { create, rename, deleteRole, findAll }
