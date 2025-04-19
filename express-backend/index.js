const express = require('express');
const cors = require('cors');
const { default: userRouter } = require('./routes/userRouter');
const { default: cartRouter } = require('./routes/cartRoute');
const { default: orderRouter } = require('./routes/orderRoute');
const { default: adminRouter } = require('./routes/adminRoute');
const { default: productRouter } = require('./routes/productRoute');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json())

connectDB(process.env.MONGO_URL);

app.use("/api/v1/user", userRouter);
app.use("/api/v1/cart", cartRouter);
app.use("/api/v1/order", orderRouter);
app.use("/api/v1/product", productRouter);
app.use("/api/v1/admin", adminRouter);


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})