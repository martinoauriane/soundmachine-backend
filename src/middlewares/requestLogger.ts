import express, { NextFunction, Request, Response } from "express";

export const requestLogger = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { method, url, body, params, query } = req;
  console.log(`[${new Date().toISOString()}] ${method} ${url}`);
  console.log("Query:", query);
  console.log("Params:", params);
  console.log("Body:", body);
  next();
};
