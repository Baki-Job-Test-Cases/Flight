import { Router } from 'express';
import { DestinationController } from '../controllers';

const destinationRoute = Router();
const destinationController = new DestinationController();

destinationRoute.get('/', destinationController.getDestinations);
destinationRoute.get('/:iata', destinationController.getDestination);

export { destinationRoute };
