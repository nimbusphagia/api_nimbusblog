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
    },
    include: {
      role: {
        select: {
          name: true
        }
      }
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
async function updateRole(id) {
  return await prisma.$transaction(async (tx) => {

    const authorRole = await tx.role.findUnique({
      where: { name: 'AUTHOR' }
    });
    const updatedUser = await tx.user.update({
      where: { id },
      data: {
        roleId: authorRole.id
      }
    });
    return updatedUser;
  });
}


export default { create, findAll, findById, showById, findByEmail, update, updateRole, deleteById };
