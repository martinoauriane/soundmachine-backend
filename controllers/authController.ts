import { Request, Response } from "express";
import { User } from "../user";
import { UserService } from "../services/userService";

// create user
export async function login(req: Request, res: Response) {}

// get user tracks
export async function getUserTracksController(req: Request, res: Response) {
  const userid = parseInt(req.params.id);
  //todo: add token authentication
  if (!userid) {
    console.error("User not found in database");
  }
  try {
    const tracks = UserService.getUserTracks(userid);
    res.status(200).json(tracks);
  } catch (error) {
    res.status(500).json({ error: "Failed retrieving tracks in db" });
  }
}

// update user // DONE
export async function get_user_by_id(req: Request, res: Response) {
  const userid = parseInt(req.params.id);
  //todo: add token authentication
  if (!userid) {
    console.error("User not found in database");
  }
  const userpseudo = req.body.pseudo;

  try {
    const user = UserService.updateUser(userid, userpseudo);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Error fetching user infos in database" });
  }
}

// delete user // DONE
export function delete_user(req: Request, res: Response) {
  const userid = parseInt(req.params.id);
  if (!userid) {
    console.error("User not found");
  }
  //todo: add token authentication

  const deletedUser = UserService.deleteUser(userid);
  if (!deletedUser) {
    res.status(200).json("User successfully deleted");
  } else {
    res.status(500).json({ error: "Error deleting user in database" });
  }
}
