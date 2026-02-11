import models from '../models/index.js'
import { hash } from '../lib/utils.js';


async function create({ email, name, password }) {
  // Check email is unique
  const existing = await models.user.findByEmail(email);
  if (existing) throw new Error('EMAIL_UNAVAILABLE');

  // Hash password
  const hash = await hash(password);

  // Get default role
  const role = await models.role.find('VIEWER');
  if (!role) {
    const newRole = await models.role.create('VIEWER');
  }
  const roleId = role ? role.id : newRole.id;

  return await models.user.create({ email, name, password: hash, roleId });
}
async function showById(id) {
  // Superficial get
  const user = await models.user.showById(id);
  if (!user) {
    throw new Error('USER_NOT_FOUND');
  }
  return user;
}
async function getById(id) {
  const user = await models.user.findById(id);
  if (!user) throw new Error('USER_NOT_FOUND');

  return user;
}
async function getByEmail(email) {
  const user = await models.user.findByEmail(email);
  if (!user) {
    throw new Error('USER_NOT_FOUND');
  }
  return user;
}
async function getAll() {
  const users = await models.user.findAll();
  return users;
}
async function update(id, input) {
  const { name, email, password } = input;
  const user = await models.user.findById(id);
  if (!user) throw new Error('USER_NOT_FOUND');

  const newData = {};
  if (name) newData.name = name;
  if (email) newData.email = email;
  if (password) newData.password = await hash(password);
  if (Object.keys(newData).length === 0) throw new Error('NO_FIELDS_TO_UPDATE');
  const updatedUser = await models.user.update(id, newData);
  return updatedUser;
}
async function updateRole(id) {
  const user = await models.user.findById(id);
  if (user.role.name !== 'VIEWER') throw new Error('INVALID_UPGRADE');
  const authorRole = await models.role.find('AUTHOR');
  if (!authorRole) await models.role.create('AUTHOR');
  return await models.user.updateRole(id);
}
export default { create, getAll, getById, getByEmail, update, updateRole }
