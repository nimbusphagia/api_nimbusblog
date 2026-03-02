import { prisma } from "../prismaClient.js";

async function create(data) {
  return await prisma.entry.create({
    data,
  })
}
async function findById(id) {
  return await prisma.entry.findUnique({
    where: {
      id
    },
    include: {
      blocks: {
        orderBy: {
          index: 'asc'
        }
      },
    }
  });
}
async function findAll(where = {}) {
  return await prisma.entry.findMany({
    where,
    include: {
      _count: {
        select: {
          likes: true,
          comments: true,
        },
      },
    }
  });
}
async function update(id, data) {
  return await prisma.entry.update({
    where: {
      id: id,
    },
    data,
  });
}
async function updateBlocks(entryId, blocks) {
  return prisma.$transaction(async (tx) => {
    await tx.block.deleteMany({
      where: { entryId },
    });

    await tx.block.createMany({
      data: blocks.map((block, index) => ({
        entryId,
        type: block.type,
        content: block.content,
        order: index,
      })),
    });

    return tx.entry.findUnique({
      where: { id: entryId },
      include: { blocks: true },
    });
  });
}

async function deleteById(id) {
  return await prisma.entry.delete({
    where: {
      id: id,
    }
  });
}

export default { create, findById, findAll, update, updateBlocks, deleteById }
