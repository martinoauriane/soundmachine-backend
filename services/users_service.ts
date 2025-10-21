import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

class UsersService {
  findById = async (userId: number) => {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    return user;
  };
}
