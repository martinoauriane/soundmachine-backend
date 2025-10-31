// server.ts
import express from "express";
import cors from "cors";
import router from "./src/router/routes";
import { bodySanitizeMiddleware } from "./src/middlewares/bodySanitize";
import { pageNotFound } from "./src/middlewares/notFoundMiddleware";

const app = express();

// middlewares
app.use(cors());
app.use(express.json()); // Parse JSON body
app.use(bodySanitizeMiddleware);

app.use(router);

app.use(pageNotFound);

const backendport = process.env.API_PORT || 5000;
const host = process.env.HOST || "localhost";

app.listen(backendport, () => {
  console.log(`Server is running at http://${host}:${backendport}/`);
});
