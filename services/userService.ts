import { PrismaClient } from "@prisma/client";
import { Track } from "../track";
import { User } from "../user";
import { hash_pwd } from "../utils/password_hash";

const prisma = new PrismaClient();

export class UserService {
  // new user
  static async newUser(user: User): Promise<User | null> {
    const hashedPassword = await hash_pwd(user.password);
    try {
      const newUser: User = await prisma.user.create({
        data: {
          firstname: user.firstname,
          lastname: user.lastname,
          pseudo: user.pseudo,
          email: user.email,
          password: hashedPassword,
        },
      });
      return newUser;
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
          // using include to include related tracks in the query response
          tracks: {
            uploadedTracks: true,
            downloadedTracks: true,
            favoriteTracks: true,
          },
        },
      });
      return user;
    } catch (error) {
      console.error("Failed to retrieve user:", error);
      throw error;
    }
  }

  // retrieve user tracks
  static async getUserTracks(userId: number): Promise<Track[] | null> {
    try {
      const userTracks: Track[] = await prisma.user.findUnique({
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
  static async updateUser(
    userId: number,
    userpseudo?: string
  ): Promise<User | null> {
    try {
      const updatedUser: User = await prisma.user.update({
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
  static async deleteUser(userId: number): Promise<User | null> {
    try {
      const deletedUser: User = await prisma.user.delete({
        where: { id: userId },
      });
      return deletedUser;
    } catch (error) {
      console.error("Failed to delete user:", error);
      throw error;
    }
  }

  // get all users
  static async getAll(): Promise<User[] | undefined> {
    try {
      const users: User[] = await prisma.user.findMany();
      return users;
    } catch (error) {
      console.error("Failed to retrieve all users from db", error);
      throw error;
    }
  }
}
