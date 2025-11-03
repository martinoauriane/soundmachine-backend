// router.ts
import { Router } from "express";
import { loginPwd } from "../middlewares/loginPwd";
import { authenticateMiddleware } from "../middlewares/authenticateJwt";
import { bodySanitizeMiddleware } from "../middlewares/bodySanitize";
import { UserController } from "../controllers/userController";
import { TrackController } from "../controllers/trackController";

const router = Router();

// USER
router.post("/user/new", UserController.createUserController);
router.get("/users/:id", UserController.getUserByIdController);
router.get("/users/all", UserController.getAllController);
router.put("/user/:id", UserController.updateUser);
router.delete(
  "/delete/:user_id",
  loginPwd,
  authenticateMiddleware,
  UserController.deleteUser
);

// TRACKS
router.get(
  "/:userid/sounds",
  loginPwd,
  authenticateMiddleware,
  UserController.getUserTracksController
);

router.put(
  "/add-sound/:userid",
  loginPwd,
  authenticateMiddleware,
  TrackController.updateTrack
);

router.post("/tracks/add", authenticateMiddleware, TrackController.addTrack);

router.delete(
  "/tracks/delete/:trackid/:userid",
  authenticateMiddleware,
  bodySanitizeMiddleware,
  TrackController.deleteTrack
);

router.get(
  "/browse-by-categories",
  authenticateMiddleware,
  TrackController.getAllTracks
);

export default router;
