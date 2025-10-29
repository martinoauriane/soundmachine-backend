import { Request, Response } from "express";
import { UserService } from "../services/userService";
import { type User } from "../user";

export class UserController {
  // create user
  static async createUser(req: Request, res: Response) {
    const user: User = {
      name: String(req.query.name),
      pseudo: String(req.query.pseudo),
      email: req.body.email,
      password: String(req.query.password),
    };

    const newUser = UserService.newUser(user);
    return newUser;
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

  // delete user
  static async deleteUser(req: Request, res: Response) {
    const userId = parseInt(req.params.id);
    const deletedUser = await UserService.deleteUser(userId);
    return deletedUser;
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
}
