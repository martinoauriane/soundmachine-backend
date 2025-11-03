import { Request, Response } from "express";
import { UserService } from "../services/userService";
import { UserRead } from "../user";
import { User as PrismaUser } from "@prisma/client";

export class UserController {
  // create user
  static async createUserController(
    req: Request,
    res: Response
  ): Promise<Response> {
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
  static async getAllController(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const result = await UserService.getAll();
      return res.status(200).json(result);
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Error retrieving users in database" });
    }
  }

  // retrieve user by id
  static async getUserByIdController(
    req: Request,
    res: Response
  ): Promise<Response> {
    const userId = parseInt(req.params.id);
    //todo: add token authentication
    if (!userId) {
      console.error("User not found in database");
    }
    try {
      const user = await UserService.getUserById(userId);
      return res.status(200).json(user);
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Error fetching user infos in database" });
    }
  }

  // get user tracks
  static async getUserTracksController(
    req: Request,
    res: Response
  ): Promise<Response> {
    const userId = Number(req.params.id);
    //todo: add token authentication
    if (!userId) {
      console.error("User not found in database");
    }
    try {
      const tracks = await UserService.getUserTracks(userId);
      return res.status(200).json(tracks);
    } catch (error) {
      return res.status(500).json({ error: "Failed retrieving tracks in db" });
    }
  }

  // update user
  static async updateUser(req: Request, res: Response): Promise<Response> {
    const userId = parseInt(req.params.id);
    if (!userId) return res.status(400).json("error: No user id");
    const { firstname, lastname, pseudo, email, password } = req.body;
    try {
      const updatedUser: UserRead | null = await UserService.updateUser(
        userId,
        {
          firstname,
          lastname,
          pseudo,
          email,
          password,
        }
      );
      return res.status(200).json(updatedUser);
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Failed to update user with given fields" });
    }
  }

  // delete user
  static async deleteUser(req: Request, res: Response): Promise<Response> {
    const userId = parseInt(req.params.id);
    try {
      const deletedUser = await UserService.deleteUser(userId);
      return res.status(200).json(deletedUser);
    } catch (error) {
      return res.status(500).json({ error: "Failed to delete user" });
    }
  }
}
