import models from '../models/index.js'
import { hash } from '../lib/utils.js';
import { UserRole } from '@prisma/client';

const userRoles = Object.values(UserRole);

async function create({ email, name, password }) {
  // Check email is unique
  const existing = await models.user.findByEmail(email);
  if (existing) throw new Error('EMAIL_UNAVAILABLE');

  // Hash password
  const hashedPassword = await hash(password);

  return await models.user.create({ email, name, password: hashedPassword });
}
async function showById(id) {
  // Gets user without sensitive fields
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
  if (name !== undefined) newData.name = name;
  if (email !== undefined) {
    const existing = await models.user.findByEmail(email);
    if (existing && existing.id !== id) {
      throw new Error('EMAIL_UNAVAILABLE');
    }
    newData.email = email;
  }
  if (password !== undefined) newData.password = await hash(password);
  if (Object.keys(newData).length === 0) throw new Error('NO_FIELDS_TO_UPDATE');
  const updatedUser = await models.user.update({ id, data: newData });
  return updatedUser;
}
// To isolate the update role logic
async function updateRole({ id, role }) {
  const user = await models.user.findById(id);
  if (!user) throw new Error('USER_NOT_FOUND');
  if (!userRoles.includes(role)) throw new Error('INVALID_ROLE');
  return await models.user.update({ id, role });
}
async function deleteById(id) {
  const user = await models.user.findById(id);
  if (!user) throw new Error('USER_NOT_FOUND');

  return await models.user.deleteById(id)
}
export default { create, getAll, getById, getByEmail, update, updateRole, deleteById }
