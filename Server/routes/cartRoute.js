import express from "express";
import { addToCart, getCart, removeFromCart } from "../controllers/cartcontroller.js";
import authmiddleware from "../middleware/authmiddleware.js";

const cartRouter = express.Router();

cartRouter.post("/add", authmiddleware, addToCart);
cartRouter.post("/remove", authmiddleware, removeFromCart);
cartRouter.post("/get", authmiddleware, getCart);

export default cartRouter;