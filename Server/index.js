import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import "dotenv/config.js";

// Import routes
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";


// App config
const app = express();
const port = process.env.PORT || 7000; 

// Middleware
app.use(express.json());
app.use(
    cors({
        origin: ["https://food-order-website-fe.onrender.com","http://localhost:5173","https://food-order-website-admin-bpwz.onrender.com"],
        credentials: true,
        methods: ["GET","POST","PUT","DELETE","OPTION"]
    })
);

// DB Connection
connectDB();

// API Endpoints
app.use("/api/food", foodRouter);
app.use("/images", express.static('uploads'))
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);




app.get("/", (req, res) => {
    res.send("API Working");
});

// Start server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
