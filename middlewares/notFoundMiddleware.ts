import express, { NextFunction, Request, Response } from "express";

export const pageNotFound = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(404).json({
    success: false,
    message: "Page not found — The requested resource does not exist.",
  });
};
