import express, { NextFunction, Request, Response } from "express";
import xss from "xss-clean";

// Helps prevent XSS (Cross-Site Scripting) attacks.
// Ensures user inputs are cleaned before processing.

export const bodySanitizeMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const sanitize = (input: any): any => {
    if (typeof input === "string") return xss(input);
    if (typeof input === "object" && input !== null) {
      for (const key in input) {
        input[key] = sanitize(input[key]);
      }
    }
    return input;
  };

  req.body = sanitize(req.body);
  req.query = sanitize(req.query);
  req.params = sanitize(req.params);

  next();
};
