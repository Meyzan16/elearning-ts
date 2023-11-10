import express from "express";

import {
  activateUser,
  getAllUsers,
  getUserInfo,
  loginUser,
  logoutUser,
  registrationUser,
  socialAuth,
  updateAccessToken,
  updatePasswordAuth,
  updateProfilePicture,
  updateUserInfo,
} from "../controllers/user.controller";
import { authorizeRoles, isAuthenticated } from "../middleware/auth";

const userRouter = express.Router();

userRouter.post("/register", registrationUser);
userRouter.post("/activate-user", activateUser);
userRouter.post("/login", loginUser);
userRouter.get("/logout", isAuthenticated, logoutUser);
userRouter.get("/refresh-token", updateAccessToken);
userRouter.get("/me", isAuthenticated, getUserInfo);
userRouter.post("/social-auth", socialAuth);
userRouter.put("/update-user-info", isAuthenticated, updateUserInfo);
userRouter.put("/update-user-password", isAuthenticated, updatePasswordAuth);
userRouter.put("/update-user-avatar", isAuthenticated, updateProfilePicture);

userRouter.get("/getall-users", isAuthenticated, authorizeRoles("admin"), getAllUsers);

export default userRouter;
