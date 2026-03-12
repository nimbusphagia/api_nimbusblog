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
      author: {
        select: {
          name: true,
          imgUrl: true,
        }
      },
      comments: {
        orderBy: {
          createdAt: 'desc'
        },
        include: {
          user: {
            select: {
              name: true,
              imgUrl: true,
            },
          },
          _count: {
            select: {
              likes: true
            }
          }
        }
      }
    }
  })
}
async function findAll(where = {}) {
  return await prisma.entry.findMany({
    where,
    orderBy: {
      createdAt: 'desc',
    },
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
async function getMostRecentPublished({ authorId }) {
  return await prisma.entry.findMany({
    where: {
      authorId,
      publishedAt: { not: null },
    },
    orderBy: {
      publishedAt: 'desc',
    },
    take: 3,
  });
}
async function getMostLiked({ authorId }) {
  return await prisma.entry.findMany({
    where: {
      authorId,
      publishedAt: { not: null },
    },
    orderBy: {
      likes: { _count: 'desc' }
    },
    take: 3,
  }
  );
}
export default { create, findById, findAll, update, updateBlocks, deleteById, getMostRecentPublished, getMostLiked }
