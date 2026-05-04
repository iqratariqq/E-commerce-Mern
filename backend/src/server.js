import connectDB from "./config/mongo.connect.js";
import express from "express";
import "dotenv/config.js";
import authRoutes from "./routes/auth.route.js";
import menuRoutes from "./routes/menu.route.js";
import cartRoutes from "./routes/cart.route.js";
import couponRoutes from "./routes/coupon.route.js";
import analyticsRoutes from "./routes/analytics.routes.js"
import payementRoutes from "./routes/payment.route.js"
import reviewRoutes from "./routes/review.routes.js";
import adminRoutes from "./routes/admin.routes.js"
import kitchenRoutes from "./routes/kitchen.routes.js"
import orderRoutes from "./routes/order.route.js"
import cookieParser from "cookie-parser";
import cors from "cors"

const app = express();

app.use(cors({origin:"http://localhost:5173",
  credentials:true,
}))
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());




app.get("/", (req, res) => {
  res.status(200).json("backend is running ");
});

app.use("/api/auth", authRoutes);
app.use("/api/menu", menuRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/coupon", couponRoutes);
app.use("/api/analytics",analyticsRoutes)
app.use("/api/payment",payementRoutes)
app.use("/api/kitchen",kitchenRoutes)
app.use("/api/reviews",reviewRoutes)
app.use("/api/orders",orderRoutes)

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`app is listenig at http://localhost:${port}`);
  });
});
