import productModel from "../models/productModel.js";

const addProduct = async (req, res) => {
    let image_filename = `${req.file.filename}`;

    const product = new productModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        image: image_filename,
        category: req.body.category
    })

    try {
        await product.save();
        res.json({success:true, message:"Product Added Successfully"});
    } catch (error) {
        res.status(400).json({success:false, message:"Error in adding product", error:error});
    }
}

const getProducts = async (req, res) => {
    try {
        const products = await productModel.find({});
        res.json({success:true, data:products});
    } catch (error) {
        res.status(400).json({success:false, message:"Error in fetching product items", error:error});
    }
}

const deleteProduct = async (req, res) => {
    try {
        const product = await productModel.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`, () => {});
        
        await productModel.findByIdAndDelete(req.body.id);
        res.json({success:true, message:"Product Removed Successfully"});
    } catch (error) {
        res.status(400).json({success:false, message:"Error in removing product", error:error});
    }
}

// const updateProduct = (req, res) => {

// }

// const getProductById = (req, res) => {

// }

// const getProductByCategory = (req, res) => {

// }

export { addProduct, getProducts, deleteProduct }