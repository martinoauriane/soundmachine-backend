import { PrismaClient } from "@prisma/client";
import { User } from "../user";
import { hash_pwd } from "../utils/password_hash";

interface UserService {}
const prisma = new PrismaClient();

export const NewUser = async (user: User) => {
  await prisma.user.create({
    data: {
      name: user.name,
      email: user.email,
      password: hash_pwd(user.password),
    },
  });
};

export const getUserTracks: object | null = async (userId: number) => {
  await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      tracks: true,
    },
  });
};
