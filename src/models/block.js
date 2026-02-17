import { prisma } from "../prismaClient.js";

async function create(data) {

  return await prisma.block.create({
    data,
  })
}
async function findById(id) {
  return await prisma.block.findUnique({
    where: {
      id
    }
  });
}
async function findAll(where = {}) {
  return await prisma.block.findMany({ where });
}
async function update(id, data) {

  return await prisma.block.update({
    where: {
      id: id,
    },
    data,
  });
}
async function deleteById(id) {
  return await prisma.block.delete({
    where: {
      id: id,
    }
  });
}

export default { create, findById, findAll, update, deleteById }
