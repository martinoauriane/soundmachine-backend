import { create_user } from "./../controllers/user";
import { Params } from "./../node_modules/@types/express-serve-static-core/index.d";
import { Track } from "./track_controller";
import hash_pwd from "../utils/hash_pwd";
import ENV from "../utils/env";
import express, { Request, Response } from "express";
import { User } from "../user";

// create user
export async function create_user(req: Request, res: Response) {
  const user: User = {
    name: String(req.query.name),
    pseudo: String(req.query.pseudo),
    email: req.body.email,
    password: String(req.query.password),
  };
  try {
    const newUser = UserService.NewUser(user);
    res.status(200).json("user successfully created");
  } catch (error) {
    res.status(500).json({ error: "Error creating new user" });
  }
}

// get user tracks
export async function userTracks(req: Request, res: Response) {
  const userid = req.params.id;
  //todo: add token authentication
  if (!userid) {
    console.error("User not found in database");
  }
}

// update user
export async function get_user_by_id(req: Request, res: Response) {
  const userid = req.params.id;
  //todo: add token authentication
  if (!userid) {
    console.error("User not found in database");
  }
  try {
    const user = UserService.updateUser(userid);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Error fetching user infos in database" });
  }
}

// delete user
export function delete_user(req: Request, res: Response) {
  const userid = req.params.id;
  if (!userid) {
    console.error("User not found");
  }
  //todo: add token authentication

  const query = `IF  EXISTS (SELECT * FROM ${ENV.DB_NAME} WHERE user.id = '${userid} DROP USER [user.name]`;
  const tracks = db.query(query, [userid], (err, result) => {
    if (err) {
      res.status(500).json({ error: "Error trying to delete user in db" });
    }
    res.status(200).json("successfully deleted account");
  });
}
