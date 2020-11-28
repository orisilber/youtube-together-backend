import express from "express";
import routes from "./api";
import cors from "cors";
import { json } from "body-parser";

const app = express();
const server = app.listen(3000);
const io = require("socket.io")(server, { cors: { origin: "*" } });

(app as any).io = io;
app.use(cors({ origin: "*" }));
app.use(json());
app.use(routes);

io.on("connection", () => {
  console.log("user connected");
});
