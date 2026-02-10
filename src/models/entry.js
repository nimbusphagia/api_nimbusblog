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
  /*
   data:{
    title,
    authorId,
    blocks,
    publishedAt,
   }
   */
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
    where
  });
}
async function update(id, data) {
  /*
   data:{
    title,
    blocks,
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
async function deleteById(id) {
  return await prisma.entry.delete({
    where: {
      id: id,
    }
  });
}

export default { create, findById, findAll, update, deleteById }
