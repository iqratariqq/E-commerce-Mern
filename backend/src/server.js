import connectDB from "./config/mongo.connect.js";
import express from "express";
import "dotenv/config.js";
import authRoutes from "./routes/auth.route.js";
import cookieParser from "cookie-parser";

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.status(200).json("backend is running ");
});


app.use("/api/auth",authRoutes)


connectDB().then(() => {
  app.listen(port, () => {
    console.log(`app is listenig at http://localhost:${port}`);
  });
});
