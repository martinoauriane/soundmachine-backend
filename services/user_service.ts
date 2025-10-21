import { PrismaClient } from "@prisma/client";
import { User } from "../user";
import { hash_pwd } from "../utils/password_hash";

const prisma = new PrismaClient();

export class UserService {
  // create user
  static async NewUser(user: User) {
    prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: hash_pwd(user.password),
      },
    });
  }

  // retrieve user by id
  static async getUserTracks(userId: number) {
    await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        tracks: true,
      },
    });
  }

  // update user
  static async updateUser(userId: number, userpseudo?: string) {
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        pseudo: userpseudo,
      },
    });
  }

  //delete user
  static async deleteUser(userId: number) {
    try {
      const deletedUser = await prisma.user.delete({
        where: { id: userId },
      });
      return deletedUser;
    } catch (error) {
      console.error("Error while trying to delete user:", error);
      throw new Error("Impossible to delete user.");
    }
  }
}
