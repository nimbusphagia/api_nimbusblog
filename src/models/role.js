import { prisma } from "../prismaClient.js";

async function create(name) {
  const newRole = await prisma.role.create({
    data: {
      name: name,
    }
  });
  return newRole;
};
async function find(name) {
  const role = await prisma.role.findUnique({
    where: {
      name,
    }
  });
  return role;
} async function findById(id) {
  const role = await prisma.role.findUnique({
    where: {
      id
    }
  });
  return role;
}
async function findAll() {
  return await prisma.role.findMany({

  });
}
async function update({ id, name }) {
  return await prisma.role.update({
    where: {
      id: id,
    },
    data: {
      name: name,
    }
  });
}
async function deleteById(id) {
  return await prisma.role.delete({
    where: {
      id: id,
    }
  });
}

export default { create, find, findAll, update, deleteById };
