import { prisma } from "../prismaClient.js";


const publicUser = {
  name: true,
  role: true,
};

async function create(data) {
  /*
   data:{
    userId,
    entryId,
    commentId,
   }
   */
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
      publicUser,
    }
  });
}
async function findByEntry(entryId) {
  return await prisma.like.findMany({
    where: {
      entryId,
    },
    include: {
      publicUser,
    }

  });
}
async function findByComment(commentId) {
  return await prisma.like.findMany({
    where: {
      commentId,
    },
    include: {
      publicUser,
    }
  });
}

async function deleteById(id) {
  return await prisma.like.delete({
    where: {
      id: id,
    }
  });
}

export default { create, findById, findByEntry, findByComment, deleteById }
