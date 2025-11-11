import express, { NextFunction, Request, Response } from "express";
import xss from "xss-clean";

// xss helps secure code against XSS (Cross-Site Scripting) attacks.

const sanitize = (input: any): any => {
  if (typeof input === "string") return xss(input);
  return input;
};

export const bodySanitizeMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  req.body = sanitize(req.body);
  req.query = sanitize(req.query);
  req.params = sanitize(req.params);
  next();
};
