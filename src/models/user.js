import { prisma } from '../prismaClient.js';

async function create(data) {
  return await prisma.user.create({
    data,
  });
}
async function findAll() {
  return await prisma.user.findMany();
}
async function showById(id) {
  // Superficial find 
  return await prisma.user.findFirst({
    where: {
      id,
    },
    select: {
      name: true,
      role: {
        select: {
          name: true,
        }
      },
    }
  });
}
async function findById(id) {
  return await prisma.user.findUnique({
    where: {
      id,
    }
  });
}
async function findByEmail(email) {
  return await prisma.user.findUnique({
    where: {
      email,
    }
  });
}

async function update(id, data) {
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
