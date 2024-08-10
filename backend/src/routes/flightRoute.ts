import { Router } from 'express';
import { FlightController } from '../controllers';

if (!process.env.SCHIPHOL_FLIGHT_APP_ID || !process.env.SCHIPHOL_FLIGHT_APP_KEY)
    throw new Error('Missing Flight Api Credentials...');

export const flightRoute = Router();
const flightController = new FlightController(
    process.env.SCHIPHOL_FLIGHT_APP_ID,
    process.env.SCHIPHOL_FLIGHT_APP_KEY,
);

flightRoute.get('/search', flightController.searchFlight);
