import { PrismaClient } from "@prisma/client";
import { User } from "../user";
import { hash_pwd } from "../utils/password_hash";

const prisma = new PrismaClient();

export class UserService {
  // create user
  static async newUser(user: User) {
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

  // get user by Id
  static async getUserById(userId: number): Promise<User | null> {
    try {
      const user = await prisma.user.findUnique({
        where: { id: userId }, // by default Prisma gets all user columns
        include: {
          tracks: true,
        },
      });
      return user;
    } catch (error) {
      console.error("Failed to retrieve user:", error);
      throw error;
    }
  }

  // retrieve user tracks
  static async getUserTracks(userId: number) {
    try {
      const userTracks = await prisma.user.findUnique({
        where: { id: userId },
        select: { tracks: true },
      });
      return userTracks;
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

  // delete user
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

  // get all users
  static async getAll() {
    try {
      const users = await prisma.user.findMany();
      return users;
    } catch (error) {
      console.error("Failed to retrieve all users from db", error);
    }
  }
}
