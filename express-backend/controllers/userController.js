import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import { z } from "zod";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/config.js";

const SignupUser = async (req,res) => {
    const requiredBody = z.object({
        name: z.string().min(2).max(20),
        email: z.string().email(),
        password: z
          .string()
          .min(8)
          .max(20)
          .refine(
            (v) => {
              return /^(?=.*[A-Z]).+$/g.test(v);
            },
            { message: "At least one uppercase expected" }
          )
          .refine(
            (v) => {
              return /^(?=.*[0-9]).+$/g.test(v);
            },
            { message: "At least one digit expected" }
          )
          .refine(
            (v) => {
              return /^(?=.*[^a-zA-Z0-9]).+$/g.test(v);
            },
            { message: "At least one symbol expected" }
          ),
      });
    
      const parsedDatWithSuccess = requiredBody.safeParse(req.body);
    
      if (!parsedDatWithSuccess.success) {
        return res.json({
          msg: "Incorrect Password",
          error: parsedDatWithSuccess.error,
        });
      }
    
      const { name, password, email } = req.body;
    
      try {
        const exists = await userModel.findOne({ email });
        if (exists) {
          res.json({
            success: "false",
            msg: "email already exists, please login",
          });
          return;
        }
    
        const hashedPassword = await bcrypt.hash(password, 10);
    
        const newUser = new userModel({
          name,
          email,
          password: hashedPassword,
        });
    
        const user = await newUser.save();
    
        res.json({
          success: "true",
          msg: "Signup successful",
        });
      } catch (error) {
        res.json({
          msg: "Error while signup",
          error: error,
        });
      }
}

const loginUser = async (req,res) => {
    const requiredBody = z.object({
        email: z.string().email(),
        password: z.string().min(3).max(30),
      });
    
      const parsedDatWithSuccess = requiredBody.safeParse(req.body);
    
      if (!parsedDatWithSuccess.success) {
        return res.json({
          msg: "Incorrect Format... Please enter again",
          error: parsedDatWithSuccess.error,
        });
      }
    
      const { email, password } = req.body;
    
      const user = await userModel.findOne({ email });
      if (!user) {
        return res.json({
          success: false,
          msg: "User not found. Check username",
        });
      }
    
      try {
        const passwordMatch = await bcrypt.compare(password, user.password);
    
        if (passwordMatch) {
          const token = jwt.sign(
            {
              id: user._id.toString(),
            },
            JWT_SECRET
          );
          console.log(JWT_SECRET)
    
            res.json({
            success:true,
            token, 
          });
        } else {
          res.status(403).json({
            message: "Incorrect credentials",
          });
        }
      } catch (error) {
        console.log(error);
        res.status(500).json({
          msg: "internal server error",
          error: error,
        });
      }
}


const updateUser = async (req,res) => {
    res.json({
        msg: "api not developed yet"
    })
}

const getAllUser = async (req,res) => {
    try {
        const allUsers = await userModel.find({});
        const users = allUsers.map((user) => {
            return {
                name: user.name,
                email: user.email,
            };
        });
        res.json({
            success: true,
            users: users,
        });
    } catch (error) {
        res.json({
            success: false,
            msg: "Error while fetching users",
            error: error,
        });
    }
}

export {loginUser, SignupUser, updateUser, getAllUser}