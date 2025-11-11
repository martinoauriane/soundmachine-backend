import { Request, Response } from "express";
import { UserService } from "../services/userService";
import { UserRead, UserShortRead } from "../../types/user";
import { User as PrismaUser } from "@prisma/client";
import jwt from "jsonwebtoken";

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
      const newUser: UserShortRead = await UserService.newUser({
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

  static async loginController(req: Request, res: Response): Promise<Response> {
    console.log("Login route hit", req.body);
    const { email, password } = req.body;
    if (!email || !password) {
      throw new Error("Credentials missing");
    }

    try {
      const isPasswordValid = await UserService.checkPassword(email, password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      const user = await UserService.getUserByEmail(email);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET not defined");
      }

      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      return res.status(200).json({ token });
    } catch (error) {
      return res.status(500).json({ error: "Error login" });
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
