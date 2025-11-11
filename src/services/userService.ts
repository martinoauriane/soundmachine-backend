import { PrismaClient, User as PrismaUser } from "@prisma/client";
import { Track, TrackRead } from "../../types/track";
import { User, UserShortRead, UserUpdate } from "../../types/user";
import { hash_pwd, verifyPassword } from "../utils/password_hash";
import { UserCreate, UserRead } from "../../types/user";

const prisma = new PrismaClient();

export class UserService {
  // new user
  static async newUser(user: UserCreate): Promise<UserShortRead> {
    const hashedPassword = await hash_pwd(user.password);
    try {
      const newUser: PrismaUser = await prisma.user.create({
        data: {
          firstname: user.firstname,
          lastname: user.lastname,
          pseudo: user.pseudo,
          email: user.email,
          password: hashedPassword,
        },
      });
      return {
        id: newUser.id,
        firstname: newUser.firstname,
        lastname: newUser.lastname,
        pseudo: newUser.pseudo,
        email: newUser.email,
      };
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
      if (!user) throw new Error(`User with email ${email} not found`);
      const check = await verifyPassword(password, user.password);
      if (!check) throw new Error("Invalid password");
      return true;
    } catch (error) {
      return false;
    }
  }

  // get user by Id
  static async getUserById(userId: number): Promise<UserRead | null> {
    try {
      const user: UserRead | null = await prisma.user.findUnique({
        where: { id: userId }, // by default Prisma gets all user columns
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
      if (!user) throw new Error(`User with ID ${userId} not found`);
      return user;
    } catch (error) {
      console.error("Failed to retrieve user:", error);
      throw error;
    }
  }

  static async getUserByEmail(email: string): Promise<UserRead | null> {
    try {
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
      if (!user) throw new Error(`User with email ${email} not found`);
      return user;
    } catch (error) {
      console.error("Failed to retrieve user:", error);
      throw error;
    }
  }

  // get all users
  static async getAll(): Promise<UserShortRead[]> {
    try {
      const users: UserShortRead[] = await prisma.user.findMany({
        select: {
          id: true,
          firstname: true,
          lastname: true,
          pseudo: true,
          email: true,
        },
      });
      return users;
    } catch (error) {
      console.error("Failed to retrieve all users from db", error);
      throw error;
    }
  }

  // retrieve user tracks
  static async getUserTracks(userId: number): Promise<TrackRead[] | null> {
    try {
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { uploadedTracks: true },
      });

      if (!user) return null;

      const tracks: TrackRead[] = user.uploadedTracks.map((track) => ({
        id: track.id,
        title: track.title,
        created_at: track.created_at,
        updated_at: track.updated_at,
        duration: track.duration,
        music_genre: track.music_genre,
        authorId: track.authorId,
      }));

      return tracks;
    } catch (error) {
      console.error("Failed to retrieve user tracks:", error);
      throw error;
    }
  }

  // update user
  static async updateUser(
    userId: number,
    user: UserUpdate
  ): Promise<UserRead | null> {
    try {
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
      return updatedUser;
    } catch (error) {
      console.error("Failed to update user:", error);
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
}
