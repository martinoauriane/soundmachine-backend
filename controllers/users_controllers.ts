import express, { Request, Response } from "express";
import { Track } from "./track_controller";
import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

interface User {
  id: number;
  name: string;
  pseudo: string;
  tracks?: Track[];
  downloadedTracks?: Track[];
  uploadedTracks?: Track[];
}

// retrieve all users
export async function get_all_users(req: Request, res: Response) {
  const result = await prisma.users.findMany({});
  return result;
}

// retrieve user by user id
export async function get_user_by_id(req: Request, res: Response) {
  const userid = req.params.id;
  //todo: add token authentication
  if (!userid) {
    console.error("User not found in database");
  }
  try {
    const user = UserService.getById(userid);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Error fetching user infos in database" });
  }
}
