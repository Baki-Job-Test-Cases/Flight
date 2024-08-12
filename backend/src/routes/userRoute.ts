import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import { authMiddleware } from '../middlewares/auth';

export const userRoute = Router();
const userController = new UserController();

userRoute.get('/flight', authMiddleware, userController.getFlights);
userRoute.post('/flight', authMiddleware, userController.addFlight);
