import { Router } from 'express';
import { AuthController } from '../controllers';
import { authMiddleware } from '../middlewares/auth';

const authRoute = Router();
const authController = new AuthController();

authRoute.post('/signin', authController.signIn);
authRoute.post('/signup', authController.signUp);
authRoute.post('/signout', authController.signOut);
authRoute.post('/verify', authMiddleware, authController.verify);

export { authRoute };
