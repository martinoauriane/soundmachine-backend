// router.ts
import { Router } from "express";
import { loginPwd } from "../middlewares/loginPwd";
import { authenticateMiddleware } from "../middlewares/authenticateJwt";
import { bodySanitizeMiddleware } from "../middlewares/bodySanitize";
import { login } from "../controllers/authController";
import { UserController } from "../controllers/userController";
import { TrackController } from "../controllers/trackController";

const router = Router();

// USER
router.post("/user/new", UserController.createUser);
router.get("/users/:id", UserController.getUserById);
router.get("/users/all", UserController.getAll);
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
  UserController.getUserTracks
);

router.put(
  "/add-sound/:userid",
  loginPwd,
  authenticateMiddleware,
  TrackController.updateTrack
);

router.post(
  "/tracks/add",
  login,
  authenticateMiddleware,
  TrackController.addTrack
);

router.delete(
  "/tracks/delete/?track=trackid&?user=userid",
  login,
  authenticateMiddleware,
  bodySanitizeMiddleware,
  TrackController.deleteTrack
);

router.get(
  "/browse-by-categories",
  login,
  authenticateMiddleware,
  TrackController.getAllTracks
);

export default router;
