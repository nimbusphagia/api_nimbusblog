import { prisma } from "../prismaClient.js";


async function create({ entryId, userId, text }) {
  return await prisma.comment.create({
    data: {
      entryId,
      userId,
      text,
    }
  })
}
async function findById(id) {
  return await prisma.comment.findUnique({
    where: {
      id
    }
  });
}
async function findAll(data = {}) {
  return await prisma.comment.findMany({
    where: {
      data,
    }
  });
}
async function update({ id, text }) {
  return await prisma.comment.update({
    where: {
      id: id,
    },
    data: {
      text,
    },
  });
}
async function deleteById(id) {
  return await prisma.comment.delete({
    where: {
      id: id,
    }
  });
}

export default { create, findById, findAll, update, deleteById }
