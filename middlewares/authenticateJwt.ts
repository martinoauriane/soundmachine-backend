import { Request, Response, NextFunction } from "express";
import { type User } from "../user";

const jwt = require("jsonwebtoken");

// Jwt authenticate middleware protects routes without repetitive token checks in controllers.
// It ensures users are authenticated before accessing restricted resources.

export function authenticateMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });
  jwt.verify(token, process.env.JWT_SECRET, (err: Error, user: User) => {
    if (err) {
      return res.status(403).json({ message: "Forbidden" });
    } else {
      req.body.user = user;
    }
    next();
  });
}
