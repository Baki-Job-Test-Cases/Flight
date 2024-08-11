import { Router } from 'express';
import { FlightController } from '../controllers';

export const flightRoute = Router();
const flightController = new FlightController();

flightRoute.get('/', flightController.getFlights);
flightRoute.get('/:id', flightController.getFlight);
