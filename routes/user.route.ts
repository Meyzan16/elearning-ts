import express from "express";

import { activateUser, registrationUser } from "../controllers/user.controller";
import { testController } from "../controllers/test.controller";

const userRouter = express.Router();

userRouter.post('/register', registrationUser);
userRouter.post('/activate-user', activateUser);

export default userRouter;