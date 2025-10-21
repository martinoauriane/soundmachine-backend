import { Request, Response, NextFunction } from "express";

export function authenticationMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authenticationToken = req.headers["authorization"];

  if (authenticationToken !== undefined) {
    const isTokenValid = !!users.find(
      (u) => u.authenticationToken === authenticationToken
    );

    if (isTokenValid) {
      // retrieving the user associated with the authenticationToken value
      const user = users.find(
        (u) => u.authenticationToken === authenticationToken
      );
      req.user = user;

      // if the authorization token is invalid or missing returning a 401 error
      res.status(401).send("Unauthorized");
    }
  }
}
