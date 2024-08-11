import { Router } from 'express';
import { AirlineController } from '../controllers';

export const airlineRoute = Router();
const airlineController = new AirlineController();

airlineRoute.get('/', airlineController.getAirlines);
airlineRoute.get('/:code', airlineController.getAirline);
