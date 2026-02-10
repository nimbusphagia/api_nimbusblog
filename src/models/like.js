import { prisma } from "../prismaClient.js";

/*
model Like {
  id        String   @id @default(uuid())
  user      User     @relation(fields: [userId], references: [id])
  userId    String
  entry     Entry?   @relation(fields: [entryId], references: [id])
  entryId   String?
  comment   Comment? @relation(fields: [commentId], references: [id])
  commentId String?
  createdAt DateTime @default(now())

  @@unique([userId, entryId])
  @@unique([userId, commentId])
}
*/

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
    }
  });
}
async function findAll() {
  return await prisma.like.findMany();
}
async function deleteById(id) {
  return await prisma.like.delete({
    where: {
      id: id,
    }
  });
}

export default { create, findById, findAll, deleteById }
