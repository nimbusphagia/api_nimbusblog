import { prisma } from "../prismaClient.js";

/*
model Block {
  id        String    @id @default(uuid())
  entry     Entry     @relation(fields: [entryId], references: [id])
  entryId   String
  blockType BlockType
  index     Int
  text      String
  mediaSrc  String
}
enum BlockType {
  TEXT
  IMAGE
  HEADING
} */

async function create(data) {
  /*
   data:{
    entryId,
    blockType,
    index,
    text,
    mediaSrc
   }
   */
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
async function findAll() {
  return await prisma.block.findMany();
}
async function update(id, data) {
  /*
   data:{
    blockType,
    index,
    text,
    mediaSrc
   }
   */
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
