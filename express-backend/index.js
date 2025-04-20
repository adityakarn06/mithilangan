import express from 'express';
import cors from 'cors';
import userRouter from './routes/userRouter.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
// import orderRouter from './routes/orderRoute.js';
// import adminRouter from './routes/adminRoute.js';
import { connectDB } from './config/db.js';

import "dotenv/config.js"
const port = process.env.BACKEND_PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json())

connectDB(process.env.MONGO_URL);

app.use("/api/v1/user", userRouter);
app.use("/images", express.static("uploads"));  // serving images (http://localhost:5000/images/1737997886706-AdiPic.jpg)
app.use("/api/v1/product", productRouter);
app.use("/api/v1/cart", cartRouter);
// app.use("/api/v1/order", orderRouter);
// app.use("/api/v1/admin", adminRouter);


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})