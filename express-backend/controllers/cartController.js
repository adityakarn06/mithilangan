import userModel from "../models/userModel.js";

const addToCart = async (req, res) => {
    const { userId, itemId } = req.body;
    try {
        let userData = await userModel.findById(userId);
        let cartData = await userData.cartData;
        if (!cartData[itemId]) {
            cartData[itemId] = 1
        } else {
            cartData[itemId] += 1
        }
        await userModel.findByIdAndUpdate(itemId, {cartData:cartData});
        res.json({success:true, message:"Item added to cart"});
    } catch (error) {
        res.json({success:false, message:"Error...Item not added to cart", error:error});
    }
}

const removeFromCart = async (req, res) => {
    const { userId, itemId } = req.body;
    try {
        let userData = await userModel.findById(userId);
        let cartData = await userData.cartData;
        if (cartData[itemId] > 0) {
            cartData[itemId] -= 1;
        }
        await userModel.findByIdAndUpdate(userId, {cartData});
        res.json({success:true, message:"Item removed from cart"});
    } catch (error) {
        res.json({success:false, message:"Error...Item not removed from cart", error:error});
    }
}

const getCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        res.json({success:true, cartData});
    } catch (error) {
        res.json({success:false, message:"Error...Unable to fetch cart data", error:error});
    }
}

export { addToCart, removeFromCart, getCart };