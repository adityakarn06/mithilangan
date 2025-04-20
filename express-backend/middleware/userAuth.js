import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/config.js";

export const userAuth = (req, res, next) => {
    const token = req.headers["authorization"];

    if (!token) {
        return res.status(401).json({success:false, message: "Unauthorized... NO token provided"});
    }
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.userId = decoded.id;
        next();
    } catch (error) {
        res.status(401).json({success:false, message: "Invalid Token"});
    }
}