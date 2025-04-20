import express from 'express';
import { addToCart, removeFromCart, getCart } from "../controllers/cartController.js";
import {userAuth} from '../middleware/userAuth.js';

const cartRouter = express.Router();

cartRouter.post("/add", userAuth, addToCart);
cartRouter.post("/remove", userAuth, removeFromCart);
cartRouter.post("/get", userAuth, getCart);

export default cartRouter;