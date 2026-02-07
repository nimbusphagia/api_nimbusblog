import models from '../models/index.js'
import bcrypt from 'bcrypt'

async function create({ email, name, password }) {
  // Check email is unique
  const existing = await models.user.findByEmail(email);
  if (existing) throw new Error('EMAIL_UNAVAILABLE');

  // Hash password
  const hash = await bcrypt.hash(password, 10);

  // Get default role
  const role = await models.role.findOne('viewer');
  if (!role) {
    const newRole = await models.role.create('viewer');
  }
  const roleId = role ? role.id : newRole.id;

  return await models.user.create({ email, name, password: hash, roleId });
}
// Superficial get
async function getById(id) {
  const user = await models.user.findById(id);
  if (!user) {
    throw new Error('USER_NOT_FOUND');
  }
  return user;
}
async function getAll() {
  const users = await models.user.findAll();
  return users;
}

export default { create, getAll, getById }
