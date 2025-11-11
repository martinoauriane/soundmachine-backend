import { Request, Response, NextFunction } from "express";

import { type User } from "../../types/user";

const jwt = require("jsonwebtoken");

// Jwt authenticate middleware protects routes without repetitive token checks in controllers.
// It ensures users are authenticated before accessing restricted resources.

export function authenticateMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1];

  console.log("user token", token);
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }

  jwt.verify(token, process.env.JWT_SECRET, (err: Error, user: User) => {
    if (err) {
      return res.status(403).json({ message: "Forbidden" });
    } else {
      req.body.user = user;
    }
    next();
  });
}
