import express from "express";
import path from "path";
import cors from "cors";

import "dotenv/config";
import connectDb from "./config/db.js";
import userRoutes from "./routes/user.route.js";
import ImgRoutes from "./routes/Image.route.js";
const Port = process.env.PORT || 4000;

const app = express();
const DIR_NAME = path.resolve();
app.use(express.json());
app.use(cors());
await connectDb();

app.use("/api/user", userRoutes);
app.use("/api/image", ImgRoutes);

app.use(express.static(path.join(DIR_NAME, "/client/dist")));
app.use("*", (_, res) => {
  res.sendFile(path.resolve(DIR_NAME, "client", "dist", "index.html"));
});

app.listen(Port, () => {
  console.log(`server is listening on ${Port}`);
});
