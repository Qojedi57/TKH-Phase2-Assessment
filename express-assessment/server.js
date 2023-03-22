import express from "express";
import userRouter from "./routes/user";

export default function createServer() {
  const app = express();

  app.use(express.json());

  app.use("/users", userRouter);

  return app;
}
