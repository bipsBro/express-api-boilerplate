import config from "config";
import express from "express";
import * as bodyParser from "body-parser";
import { createServer } from "http";

const PORT = config.get("port");

process.env.TZ = "UTC";
process.env.NODE_ENV = process.env.NODE_ENV || "development";

// // @ts-ignore
// process.on("uncaughtException", e => {
//   console.log(e.message, "uncaught");
//   process.exit(1);
// });
//
// // @ts-ignore
// process.on("unhandledRejection", e => {
//   console.log(e, "unhandled");
//   process.exit(1);
// });

const isDevelopment = process.env.NODE_ENV === "development";

class App {
  public express: express.Application;
  private routes: any;

  constructor() {
    this.express = express();
  }

  public setRoutes(routes: express.Router) {
    this.routes = routes;
  }

  private initBodyParser() {
    this.express.use(bodyParser.json({ limit: "50mb" }));
    this.express.use(
      bodyParser.urlencoded({
        limit: "50mb",
        extended: true,
        parameterLimit: 50000
      })
    );
  }

  public async run() {
    this.initBodyParser();
    const router = this.routes;

    const server = createServer(this.express);
    this.express.use(async (req: any, _res: any, next) => {
      if (isDevelopment) {
        console.log(`start: ${new Date()}`);

        console.log(`url: ${req.url}`);
      }
      await next();
      if (isDevelopment) {
        console.log(`end: ${new Date()}`);
      }
    });

    this.express.use("/", router);
    await server.listen(PORT, () => {
      
      console.log(`server is listening on http://localhost:${PORT}`);
    });
    return { app: this.express, server };
  }
}

export default new App();