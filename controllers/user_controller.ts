import { Request, Response } from "express";
import { User } from "../user";
import { UserService } from "../services/users_service";

// create user // DONE
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

// get user tracks // DONE
export async function get_user_tracks(req: Request, res: Response) {
  const userid = req.params.id;
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
  const userid = req.params.id;
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
  const userid = req.params.id;
  if (!userid) {
    console.error("User not found");
  }
  //todo: add token authentication

  const deletedUser = UserService.deleteUser;
  if (deletedUser) {
    res.status(200).json("User successfully deleted");
  } else {
    res.status(500).json({ error: "Error deleting user in database" });
  }
}
