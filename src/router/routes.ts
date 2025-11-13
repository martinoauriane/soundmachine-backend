// router.ts
import { Router } from "express";
import { authenticateMiddleware } from "../middlewares/authenticateMiddleware";
import { bodySanitizeMiddleware } from "../middlewares/bodySanitize";
import { UserController } from "../controllers/userController";
import { TrackController } from "../controllers/trackController";

const router = Router();

//welcome test route
router.get("/api", (req, res) => {
  res.status(200).send({ success: "true", message: "welcome" });
});

// USER
router.post("/api/user/new", UserController.createUserController);
router.post("/api/user/login", UserController.loginController);
router.get("/api/user/:id", UserController.getUserByIdController); // get user by id
router.get("/api/users", UserController.getSomeUsersController);
router.put("/api/user/:id", UserController.updateUserController);
router.delete(
  "/api/user/delete/:id",
  authenticateMiddleware,
  UserController.deleteUserController
);

// USER TRACKS
router.post(
  "/api/user/:id/tracks/add",
  authenticateMiddleware,
  TrackController.addTrack
);

router.get(
  "/api/user/:id/tracks",
  authenticateMiddleware,
  UserController.getUserTracksController
);

// TRACKS

// get all tracks
router.get(
  "/api/tracks",
  authenticateMiddleware,
  TrackController.getSomeTracksController
);

// update a track
router.put(
  "/api/tracks/update/:trackid",
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
export default router;
