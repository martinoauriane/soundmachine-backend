import { PrismaClient } from "@prisma/client";
import { User } from "../user";
import { hash_pwd } from "../utils/password_hash";

const prisma = new PrismaClient();

export class UserService {
  // create user
  static async NewUser(user: User) {
    try {
      const hashedPassword = await hash_pwd(user.password);
      return prisma.user.create({
        data: {
          name: user.name,
          email: user.email,
          password: hashedPassword,
        },
      });
    } catch (error) {
      console.error("Failed to create user", error);
      throw error;
    }
  }

  // retrieve user by id
  static async getUserTracks(userId: number) {
    try {
      const uniqueUser = await prisma.user.findUnique({
        where: { id: userId },
        select: { tracks: true },
      });
      return uniqueUser;
    } catch (error) {
      console.error("Failed to delete user:", error);
      throw error;
    }
  }

  // update user
  static async updateUser(userId: number, userpseudo?: string) {
    try {
      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: { pseudo: userpseudo },
      });
      return updatedUser;
    } catch (error) {
      console.error("Failed to delete user:", error);
      throw error;
    }
  }

  //delete user
  static async deleteUser(userId: number) {
    try {
      const deletedUser = await prisma.user.delete({
        where: { id: userId },
      });
      return deletedUser;
    } catch (error) {
      console.error("Failed to delete user:", error);
      throw error;
    }
  }
}
