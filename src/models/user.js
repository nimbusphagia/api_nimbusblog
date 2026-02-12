import { prisma } from '../prismaClient.js';
const publicUserSelect = {
  id: true,
  name: true,
  email: true,
  role: true
};

async function create(data) {
  return await prisma.user.create({
    data,
  });
}
async function findAll() {
  return await prisma.user.findMany({
    select: publicUserSelect,
  });
}
async function showById(id) {
  // Superficial find 
  return await prisma.user.findUnique({
    where: {
      id,
    },
    select: publicUserSelect,
  });
}
async function findById(id) {
  return await prisma.user.findUnique({
    where: {
      id,
    },
  });
}
// To check email is unique and login
async function findByEmail(email) {
  return await prisma.user.findUnique({
    where: {
      email,
    }
  });
}

async function update({ id, data }) {
  return await prisma.user.update({
    where: {
      id,
    },
    data,
  })
}
async function deleteById(id) {
  return await prisma.user.delete({
    where: { id }
  })
}


export default { create, findAll, findById, showById, findByEmail, update, deleteById };
