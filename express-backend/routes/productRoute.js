import express from 'express';
import { addProduct, deleteProduct, getProductByCategory, getProductById, getProducts, updateProduct } from '../controllers/productController';

const productRouter = express.Router();

productRouter.post("/add", addProduct);
productRouter.delete("/:id", deleteProduct);
productRouter.get("/", getProducts);
productRouter.get("/:id", getProductById);
productRouter.get("/category/:category", getProductByCategory);
productRouter.put("/update/:id", updateProduct);

export default productRouter;