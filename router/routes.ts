import { bodySanitize } from "./../middlewares/bodySanitize";
// server.ts
import express, { Request, Response } from "express";
import cors from "cors";
import ENV from "../utils/env";
import { loginPwd } from "../middlewares/loginPwd";
import {
  create_user,
  delete_user,
  get_user_tracks,
} from "../controllers/user_controller";
import {
  get_all_users,
  get_user_by_id,
} from "../controllers/users_controllers";
import { get_all_tracks, update_track } from "../controllers/track_controller";
import { authenticateJwt } from "../middlewares/authenticateJwt";
import { login } from "../controllers/auth_controller";

const app = express();
const router = express.Router();

// MIDDLEWARE
app.use(cors());
app.use(express.json()); //  Parses incoming JSON requests and puts the parsed data in req.body.
app.use(router);
app.use(bodySanitize);

const startServer = () => {
  app.listen(ENV.port, () => {
    console.log(`Server is running at http://${ENV.hostname}:${ENV.port}/`);
  });
};

// user registration
router.post("/user/new", create_user);

// user login
router.get("/user", loginPwd);

// user delete
router.delete("/delete/:user_id", loginPwd, authenticateJwt, delete_user);

// ger all user tracks
router.get("/:userid/sounds", loginPwd, authenticateJwt, get_user_tracks);

// update a track
router.put("/add-sound/:userid", loginPwd, authenticateJwt, update_track);

// add a track
router.post("/tracks/add", login, authenticateJwt);

// delete a track
router.post(
  "/tracks/delete/?track=trackid&?user=userid",
  login,
  authenticateJwt,
  bodySanitize
);

// get all tracks
router.get("/browse-by-categories", login, authenticateJwt, get_all_tracks);

// get all users
router.get("/users/all", get_all_users);

// get 1 user by id
router.get("/users/:id", get_user_by_id);

startServer();
