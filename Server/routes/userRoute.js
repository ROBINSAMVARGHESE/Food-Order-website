import express from "express"
import { loginAdminUser, loginUser,registerAdminUser,registerUser } from "../controllers/usercontroller.js"


const userRouter =express.Router()


userRouter.post("/register",registerUser)
userRouter.post("/login",loginUser)
userRouter.post("/admin/register", registerAdminUser);
userRouter.post("/admin/login", loginAdminUser);


export default userRouter;