// server.ts
import express from "express";
import cors from "cors";
import ENV from "../utils/env";
//middlewares
import { loginPwd } from "../middlewares/loginPwd";
import { bodySanitizeMiddleware } from "./../middlewares/bodySanitize";
import { authenticateMiddleware } from "../middlewares/authenticateJwt";
import { pageNotFound } from "../middlewares/notFoundMiddleware";
import { login } from "../controllers/authController";
// controllers
import { UserController } from "../controllers/userController";
import { TrackController } from "../controllers/trackController";

const app = express();
const router = express.Router();
app.use(cors());
app.use(express.json()); //  Parses incoming JSON requests and puts the parsed data in req.body.
app.use(router);

// middlewares
app.use(bodySanitizeMiddleware);
app.use(pageNotFound);

const startServer = () => {
  app.listen(ENV.port, () => {
    console.log(`Server is running at http://${ENV.hostname}:${ENV.port}/`);
  });
};

// USER
// create
router.post("/user/new", UserController.createUser);

// get by id
router.get("/users/:id", UserController.getUserById);

// get all users
router.get("/users/all", UserController.getAll);

// delete by id
router.delete(
  "/delete/:user_id",
  loginPwd,
  authenticateMiddleware,
  UserController.deleteUser
);

// TRACKS
// all user tracks
router.get(
  "/:userid/sounds",
  loginPwd,
  authenticateMiddleware,
  UserController.getUserTracks
);

// put track
router.put(
  "/add-sound/:userid",
  loginPwd,
  authenticateMiddleware,
  TrackController.updateTrack
);

// add track
router.post(
  "/tracks/add",
  login,
  authenticateMiddleware,
  TrackController.addTrack
);

// delete track
router.delete(
  "/tracks/delete/?track=trackid&?user=userid",
  login,
  authenticateMiddleware,
  bodySanitizeMiddleware,
  TrackController.deleteTrack
);

// get all tracks
router.get(
  "/browse-by-categories",
  login,
  authenticateMiddleware,
  TrackController.getAllTracks
);

startServer();
