import express from 'express';
import { addProduct, deleteProduct, getProducts } from '../controllers/productController.js';
import multer from 'multer';

const productRouter = express.Router();

// Image upload
const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}-${file.originalname}`);
    }
})

const upload = multer({storage: storage});

productRouter.post("/add", upload.single("image"), addProduct);
productRouter.delete("/", deleteProduct);
productRouter.get("/", getProducts);
// productRouter.get("/:id", getProductById);
// productRouter.get("/category/:category", getProductByCategory);
// productRouter.put("/update/:id", updateProduct);

export default productRouter;