import connectDB from "./config/mongo.connect.js";
import express from "express";
import "dotenv/config.js";

const app = express();
const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.status(200).json("backend is running ");
});


connectDB().then(() => {
  app.listen(port, () => {
    console.log(`app is listenig at http://localhost:${port}`);
  });
});
