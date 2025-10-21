import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class UsersService {
  static async findById(userId: number) {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    return user;
  }
}
