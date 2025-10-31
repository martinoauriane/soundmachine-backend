import { Request, Response } from "express";
import { UserService } from "../services/userService";
import { UserUpdate, type User } from "../user";
import { UserCreate, UserRead } from "../user";
import { PrismaClient, User as PrismaUser } from "@prisma/client";

export class UserController {
  // create user
  static async createUser(req: Request, res: Response) {
    const { firstname, lastname, pseudo, email, password } = req.body;
    if (!firstname || !lastname || !pseudo || !email || !password) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    try {
      const newUser: PrismaUser = await UserService.newUser({
        firstname,
        lastname,
        pseudo,
        email,
        password,
      });
      return res.status(200).json(newUser);
    } catch (error) {
      return res.status(500).json({ error: "Failed to create new user" });
    }
  }

  // retrieve all users
  static async getAll(req: Request, res: Response) {
    const result = await UserService.getAll;
    return result;
  }

  // retrieve user by id
  static async getUserById(req: Request, res: Response) {
    const userId = parseInt(req.params.id);
    //todo: add token authentication
    if (!userId) {
      console.error("User not found in database");
    }
    try {
      const user = await UserService.getUserById(userId);
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: "Error fetching user infos in database" });
    }
  }

  // get user tracks
  static async getUserTracks(req: Request, res: Response) {
    const userId = parseInt(req.params.id);
    //todo: add token authentication
    if (!userId) {
      console.error("User not found in database");
    }
    try {
      const tracks = UserService.getUserTracks(userId);
      res.status(200).json(tracks);
    } catch (error) {
      res.status(500).json({ error: "Failed retrieving tracks in db" });
    }
  }

  // update user
  static async updateUser(req: Request, res: Response) {
    const userId = parseInt(req.params.id);
    if (!userId) res.status(400).json("error: No user id");
    const { firstname, lastname, pseudo, password } = req.body;
    try {
      const updatedUser: UserRead | null = await UserService.updateUser(
        userId,
        {
          firstname,
          lastname,
          pseudo,
          password,
        }
      );
      return res.status(200).json(updatedUser);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Failed to update user with given fields" });
    }
  }

  // delete user
  static async deleteUser(req: Request, res: Response) {
    const userId = parseInt(req.params.id);
    const deletedUser = await UserService.deleteUser(userId);
    return deletedUser;
  }
}
