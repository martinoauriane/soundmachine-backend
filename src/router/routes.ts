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
router.get("/users/:id", UserController.getUserByIdController);
router.get("/users/all", UserController.getAllController);
router.put("/user/:id", UserController.updateUser);
router.delete(
  "/delete/:user_id",
  authenticateMiddleware,
  UserController.deleteUser
);

// TRACKS
router.get(
  "/:userid/sounds",
  authenticateMiddleware,
  UserController.getUserTracksController
);

router.put(
  "/add-sound/:userid",
  authenticateMiddleware,
  TrackController.updateTrackController
);

router.post("/tracks/add", authenticateMiddleware, TrackController.addTrack);

router.delete(
  "/tracks/delete/:trackid/:userid",
  authenticateMiddleware,
  bodySanitizeMiddleware,
  TrackController.deleteTrackController
);

router.get(
  "/browse-by-categories",
  authenticateMiddleware,
  TrackController.getAllTracks
);

export default router;
