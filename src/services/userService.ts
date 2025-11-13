import { PrismaClient } from "@prisma/client";
import { TrackRead } from "../../types/track";
import { UserShortRead, UserUpdate } from "../../types/user";
import { hash_pwd, verifyPassword } from "../utils/password_hash";
import { UserCreate, UserRead } from "../../types/user";

const prisma = new PrismaClient();

export class UserService {
  // new user
  static async newUser(user: UserCreate): Promise<UserShortRead> {
    // if prisma.user.create fails, the error will be logged in the catch(error)
    const hashedPassword = await hash_pwd(user.password);
    try {
      const newUser: UserShortRead = await prisma.user.create({
        data: {
          firstname: user.firstname,
          lastname: user.lastname,
          pseudo: user.pseudo,
          email: user.email,
          password: hashedPassword,
        },
        select: {
          id: true,
          firstname: true,
          lastname: true,
          pseudo: true,
          email: true,
        },
      });
      return newUser;
    } catch (error) {
      console.error("Failed to create user", error);
      throw error;
    }
  }

  static async checkPassword(
    email: string,
    password: string
  ): Promise<boolean> {
    try {
      const user = await prisma.user.findUnique({
        where: { email: email },
        select: {
          email: true,
          password: true,
          id: true,
        },
      });
      if (user == null) throw new Error(`User with email ${email} not found`);
      const check = await verifyPassword(password, user.password);
      if (!check) throw new Error("Invalid password");
      return true;
    } catch (error) {
      console.error("Failed to login in:", error);
      return false;
    }
  }

  // get user by Id
  static async getUserById(userId: number): Promise<UserRead> {
    try {
      const user: UserRead | null = await prisma.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          firstname: true,
          lastname: true,
          pseudo: true,
          email: true,
          uploadedTracks: true,
          downloadedTracks: true,
          favoriteTracks: true,
          followers: true,
          following: true,
        },
      });
      if (user == null) throw new Error(`User with ID ${userId} not found`);
      return user;
    } catch (error) {
      console.error("Failed to retrieve user:", error);
      throw error;
    }
  }

  static async getUserByEmail(email: string): Promise<UserRead> {
    try {
      // prisma.user.findUnique will return null if no user is found
      const user: UserRead | null = await prisma.user.findUnique({
        where: { email: email },
        select: {
          id: true,
          firstname: true,
          lastname: true,
          pseudo: true,
          email: true,
          uploadedTracks: true,
          downloadedTracks: true,
          favoriteTracks: true,
          followers: true,
          following: true,
        },
      });
      if (user == null) throw new Error(`User with email ${email} not found`);
      return user;
    } catch (error) {
      throw new Error("Failed to retrieve user:");
    }
  }

  // get all users
  static async getSomeUsers(page: number, items: number) {
    try {
      // findMany returns an empty [] is no users are found
      const paginatedUsers: UserShortRead[] = await prisma.user.findMany({
        skip: (page - 1) * items, // SQL equivalent = OFFSET
        take: items, // how many users we want ( <=> SQL LIMIT)
        select: {
          id: true,
          firstname: true,
          lastname: true,
          pseudo: true,
          email: true,
        },
      });

      const totalUsers: number = await prisma.user.count({});
      const totalPages: number = Math.ceil(totalUsers / items);
      return {
        paginatedUsers,
        currentPage: page,
        totalPages: totalPages,
      };
    } catch (error) {
      throw new Error("Failed to retrieve all users from db");
    }
  }

  // retrieve user tracks
  static async getUserTracks(userId: number): Promise<TrackRead[]> {
    try {
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
          uploadedTracks: {
            select: {
              id: true,
              title: true,
              created_at: true,
              updated_at: true,
              duration: true,
              music_genre: true,
              authorId: true,
            },
          },
        },
      });
      if (user == null) throw new Error(`User with id ${userId} not found`);
      return user.uploadedTracks; // trackRead[] format
    } catch (error) {
      throw new Error(`Failed to retrieve user tracks`);
    }
  }

  // update user
  static async updateUser(userId: number, user: UserUpdate): Promise<UserRead> {
    try {
      // prisma.update returns null if no user was found
      const updatedUser: UserRead = await prisma.user.update({
        where: { id: userId },
        data: {
          firstname: user.firstname,
          lastname: user.lastname,
          pseudo: user.pseudo,
          email: user.email,
          password: await hash_pwd(user.password),
        },
        select: {
          id: true,
          firstname: true,
          lastname: true,
          pseudo: true,
          email: true, // si tu veux
          uploadedTracks: true,
          downloadedTracks: true,
          favoriteTracks: true,
          followers: true,
          following: true,
        },
      });
      if (updatedUser == null) throw new Error(`Failed to update user`);
      return updatedUser;
    } catch (error) {
      throw new Error(`Failed to update user`);
    }
  }

  // delete user
  static async deleteUser(userId: number): Promise<UserShortRead> {
    // if no user is found Prisma sends a P2025 ("Record to delete does not exist.") error.
    try {
      const deletedUser: UserShortRead = await prisma.user.delete({
        where: { id: userId },
        select: {
          id: true,
          firstname: true,
          lastname: true,
          pseudo: true,
          email: true,
        },
      });
      return deletedUser;
    } catch (error) {
      throw new Error(`Failed to delete user`);
    }
  }
}
