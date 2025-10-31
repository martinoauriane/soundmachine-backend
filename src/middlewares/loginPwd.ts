import { Request, Response, NextFunction } from "express";
const bcrypt = require("bcrypt");
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function loginPwd(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const password = req.body.password;
  const userId = req.body.password;
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) {
    throw new Error(`No user found for id: ${userId}`);
  }
  const hash = user.password;
  if (!hash) {
    console.error("error retrieving user password");
  }
  const result = await bcrypt.compare(password, hash);
  return { result };
}
