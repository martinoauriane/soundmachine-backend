import { Request, Response, NextFunction } from "express";
import ENV from "../utils/env";
const bcrypt = require("bcrypt");

export async function loginMiddleWare(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const password = req.body.password;
  const userId = req.body.password;

  const query = `SELECT password FROM ${ENV} WHERE user.id = ?)`;

  const db_hash = db.query(query, [userId], (err, result) => {
    if (err)
      res.status(500).json({ error: "error fetching password for user" });
  });

  const result = await bcrypt.compare(password, db_hash);
  return result;
}
