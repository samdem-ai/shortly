import {
  getUser,
  login,
  signUp,
  logout,
} from "../controllers/AuthController.js";
import { Router } from "express";
import { verifyToken } from "../middlewares/AuthMiddlewares.js";

const authRouter = Router();

authRouter.post("/sign-up", signUp);
authRouter.post("/login", login);
authRouter.get("/get-user", verifyToken, getUser);
authRouter.get("/logout", logout);

export default authRouter;
