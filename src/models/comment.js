import { prisma } from "../prismaClient.js";

/*
model Comment {
  id        String   @id @default(uuid())
  user      User     @relation(fields: [userId], references: [id])
  userId    String
  text      String
  createdAt DateTime @default(now())
  likes     Like[]
}
*/

async function create(data) {
  /*
   data:{
    userId,
    text,
   }
   */
  return await prisma.comment.create({
    data,
  })
}
async function findById(id) {
  return await prisma.comment.findUnique({
    where: {
      id
    }
  });
}
async function findAll() {
  return await prisma.comment.findMany();
}
async function update(id, data) {
  /*
   data:{
    text,
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
  return await prisma.comment.delete({
    where: {
      id: id,
    }
  });
}

export default { create, findById, findAll, update, deleteById }
