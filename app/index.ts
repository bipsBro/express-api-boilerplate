import * as express from "express";
import { Server } from "http";
import app from "./app";
import routes from "./routes";

app.setRoutes(routes);
let application: express.Application;
let server: Server;

app.run().then(res => {
  application = res.app;
  server = res.server;
});

export { application, server };