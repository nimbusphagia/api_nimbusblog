import { prisma } from "../prismaClient.js";


const publicUser = {
  select:
  {
    name: true,
    role: true,
  }
};

async function create(data) {
  return await prisma.like.create({
    data,
  })
}
async function findById(id) {
  return await prisma.like.findUnique({
    where: {
      id
    },
    include: {
      user: publicUser
    }
  });
}
async function findByEntry(entryId) {
  return await prisma.like.findMany({
    where: {
      entryId,
    },
    include: {
      user: publicUser,
    }

  });
}
async function findByComment(commentId) {
  return await prisma.like.findMany({
    where: {
      commentId,
    },
    include: {
      user: publicUser,
    }
  });
}
async function findUnique(where = {}) {
  return await prisma.like.findUnique({
    where,
  })
}
async function deleteById(id) {
  return await prisma.like.delete({
    where: {
      id: id,
    }
  });
}

export default { create, findById, findUnique, findByEntry, findByComment, deleteById }
