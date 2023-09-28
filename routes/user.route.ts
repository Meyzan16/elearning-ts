import express from "express";

import { registrationUser } from "../controllers/user.controller";
import { testController } from "../controllers/test.controller";

const userRouter = express.Router();

userRouter.post('/register', registrationUser);
userRouter.get('/testt', testController);

export default userRouter;