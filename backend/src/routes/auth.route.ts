import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { AuthMiddleware } from "../middleware/auth.middleware";

const authRouter = Router();

authRouter.post('/register', AuthController.register);
authRouter.post('/login', AuthController.login);
authRouter.post('/refresh', AuthController.refresh);
authRouter.post('/logout',AuthMiddleware.authenticate, AuthController.logout);

export default authRouter;