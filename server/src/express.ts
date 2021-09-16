import Express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";

import { Controller } from "./controllers/Controller";

dotenv.config();

interface ApplicationOptions {
  port: number;
  controllers: Controller[];
  onStart?: () => void;
}

export const createApplication = (options: ApplicationOptions) => {
  const { port, onStart, controllers } = options;

  const app = Express();

  app.use(bodyParser.json());
  app.use(
    cors({
      origin: /localhost/gi,
    })
  );

  controllers.forEach((controller) => {
    app.use("/", controller.router);
  });

  app.listen(port, onStart || (() => console.log("Server starting...")));

  return app;
};
