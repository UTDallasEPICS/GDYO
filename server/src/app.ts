import express, { Express } from "express";
import helmet from "helmet";
import * as http from "http";

import EventRouter from "./routes/event";

/*
  http://localhost:4000
  ngrok: http://localhost:4000 -> https://f779-47-188-107-188.ngrok-free.app
  fetch(https://f779-47-188-107-188.ngrok-free.app/event/create-single-event)

  // GET
  const query = req.query;

  // POST, PUT
  const body = req.body;

  - express
  - tsconfig (typescript, compiling)
  - ngrok (proxy a localhost url to the internet)
  - .env
  - prisma
  - docker
  - HTTP status code
  - JS Promises
  - bodyParser.json()
*/

export default class App {
  server: http.Server | null | undefined = null;
  app: Express | null | undefined = null;

  private async init() {
    const app = express();

    app.use(helmet());
    app.use(helmet.hidePoweredBy());

    // Check maintenance mode
    app.use((req, res, next) => {
      const excludePostPaths = new Set([]);

      if (
        process.env.STATUS === "maintenance" &&
        req.method === "POST" &&
        !excludePostPaths.has(req.url)
      ) {
        return res.status(400).send({
          message:
            "Server is currently in maintenance. All new data cannot be proceeded right now.",
        });
      }

      next();
    });

    // Define a route handler for the default home page
    app.get("/", (req, res) => {
      const query = req.query;
      console.log("--- Query", query);
      res.send({ payload: "Hello World!" });
    });

    app.use("/event", EventRouter);

    // custom 404
    app.use((_req, res, _next) => {
      res.status(404).send({
        message: "Sorry can't find route!",
      });
    });

    this.app = app;
  }

  async start(): Promise<http.Server | null | undefined> {
    // Init
    await this.init();

    this.server = this.app?.listen(process.env.PORT, () => {
      console.log(`Server started at port ${process.env.PORT}.`);
    });

    return this.server;
  }

  stop(): void {
    this.server?.close();
  }
}
