import express from "express"
import { getAllUser, loginUser, SignupUser, updateUser } from "../controllers/userController.js"

const userRouter = express.Router()

userRouter.post("/signup",SignupUser)
userRouter.post("/login", loginUser)
userRouter.get("/getAllUser", getAllUser)
userRouter.post("/updateUser", updateUser)

export default userRouter;