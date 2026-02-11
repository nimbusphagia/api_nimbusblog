import { prisma } from "../prismaClient.js";

/*
 model Entry {
  id          String    @id @default(uuid())
  title       String
  author      User      @relation(fields: [authorId], references: [id])
  authorId    String
  blocks      Block[]
  createdAt   DateTime  @default(now())
  publishedAt DateTime?
  likes       Like[]
}
 */

async function create(data) {
  return await prisma.entry.create({
    data,
  })
}
async function findById(id) {
  return await prisma.entry.findUnique({
    where: {
      id
    }
  });
}
async function findAll(where = {}) {
  return await prisma.entry.findMany({
    where,
    include: {
      blocks: true,
    }
  });
}
async function update(id, data) {
  /*
   data:{
    title,
    publishedAt,
   }
   */
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
