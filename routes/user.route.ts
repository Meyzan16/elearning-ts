import express from "express";

import { activateUser, loginUser, logoutUser, registrationUser } from "../controllers/user.controller";
import { testController } from "../controllers/test.controller";

const userRouter = express.Router();

userRouter.post('/register', registrationUser);
userRouter.post('/activate-user', activateUser);
userRouter.post('/login', loginUser);
userRouter.get('/logout', logoutUser);

export default userRouter;