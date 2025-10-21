// server.ts
import express, { Request, Response } from "express";
import cors from "cors";
import mysql from "mysql";
import ENV from "../utils/env";

import { create_user, delete_user, userTracks } from "../controllers/user";
import { get_all_users, get_user_by_id } from "../controllers/users";
import { get_all_tracks, update_track } from "../controllers/track_controller";
import { authenticationMiddleware } from "../middlewares/autenticationMiddleware";
import { loginMiddleWare } from "../middlewares/loginMiddleware";
import db from "../db";

const app = express();
const router = express.Router();

// MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use(router);

const startServer = () => {
  app.listen(ENV.port, () => {
    console.log(`Server is running at http://${ENV.hostname}:${ENV.port}/`);
  });
};

db.connect((err: Error) => {
  if (err) {
    console.error("Database connection failed:", err.stack);
    return;
  }
  console.log("Connected to MySQL database.");
});

// USER
// CREATE user account
router.post("/user/new", create_user);
// DELETE user account
router.delete(
  "/delete/:user_id",
  loginMiddleWare,
  authenticationMiddleware,
  delete_user
);
// GET user tracks
router.get(
  "/:userid/sounds",
  loginMiddleWare,
  authenticationMiddleware,
  userTracks
);

// USERS
// GET all users
router.get("/users/all", get_all_users);
//GET one user
router.get("/users/:id", get_user_by_id);

// TRACKS
// GET all tracks
router.get("/browse-by-categories", get_all_tracks);
// UPDATE a track
router.put("/add-sound/:userid", update_track);
// ADD A TRACK

startServer();
