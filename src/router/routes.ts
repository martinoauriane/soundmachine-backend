// router.ts
import { Router } from "express";
import { authenticateMiddleware } from "../middlewares/authenticateMiddleware";
import { bodySanitizeMiddleware } from "../middlewares/bodySanitize";
import { UserController } from "../controllers/userController";
import { TrackController } from "../controllers/trackController";

const router = Router();

//welcome
router.get("/", (req, res) => {
  res.status(200).send({
    success: "true",
    message: "welcome",
  });
});

// USER
router.post("/user/new", UserController.createUserController);
router.post("/user/login", UserController.loginController);
router.get("/user/:id", UserController.getUserByIdController); // get user by id
router.get("/users", UserController.getAllController);
router.put("/user/:id", UserController.updateUser);
router.delete(
  "/user/delete/:id",
  authenticateMiddleware,
  UserController.deleteUser
);

// USER TRACKS
router.post(
  "/user/:id/tracks/add",
  authenticateMiddleware,
  TrackController.addTrack
);

router.get(
  "/user/:id/tracks",
  authenticateMiddleware,
  UserController.getUserTracksController
);

// TRACKS
router.get("/tracks", authenticateMiddleware, TrackController.getAllTracks); // get all tracks
router.delete(
  "/tracks/delete/:trackid/:userid",
  authenticateMiddleware,
  bodySanitizeMiddleware,
  TrackController.deleteTrackController
);

router.put(
  "/add-sound/:userid",
  authenticateMiddleware,
  TrackController.updateTrackController
);

export default router;
