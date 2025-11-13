// router.ts
import { Router } from "express";
import { authenticateMiddleware } from "../middlewares/authenticateMiddleware";
import { bodySanitizeMiddleware } from "../middlewares/bodySanitize";
import { UserController } from "../controllers/userController";
import { TrackController } from "../controllers/trackController";

const router = Router();

//welcome test route
router.get("/welcome", (req, res) => {
  res.status(200).send({ success: "true", message: "welcome" });
});

// USER
router.post("/api/user/new", UserController.createUserController);
router.post("/api/user/login", UserController.loginController);
router.get("/api/user/:id", UserController.getUserByIdController); // get user by id
router.put("/api/user/:id", UserController.updateUserController);
router.delete(
  "/api/user/delete/:id",
  authenticateMiddleware,
  UserController.deleteUserController
);

// user adds a track
router.post(
  "/api/user/:id/tracks/add",
  authenticateMiddleware,
  TrackController.addTrack
);

//get user tracks
router.get(
  "/api/user/:id/tracks",
  authenticateMiddleware,
  UserController.getUserTracksController
);

// USERS
// /api/users?page=1&items=10 facultative pagination
router.get("/api/users", UserController.getSomeUsersController);

// TRACKS
// get some tracks /api/tracks?page=5&items=20 facultative pagination
router.get("/api/tracks", TrackController.getSomeTracksController);

// update a track
router.put(
  "/api/tracks/update/:track_id",
  authenticateMiddleware,
  TrackController.updateTrackController
);

// delete a track
router.delete(
  "/api/tracks/delete/:trackid/:userid",
  authenticateMiddleware,
  bodySanitizeMiddleware,
  TrackController.deleteTrackController
);

// Not Found route
router.get("/error", (req, res, next) => {
  res.status(404).json({ error: "Ressource Not Found" });
});
export default router;
