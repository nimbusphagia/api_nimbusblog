import jwt from 'jsonwebtoken';
import models from '../models/index.js'
import bcrypt from 'bcrypt'
const { sign, verify, decode } = jwt;

async function login(email, password) {
  const user = await models.user.findByEmail(email);
  if (!user) throw new Error("INVALID_CREDENTIALS");

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new Error("INVALID_CREDENTIALS");

  const token = sign(
    { sub: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
  return { token, user };
}

export default { login }
