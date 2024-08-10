import * as z from 'zod';
import { flightFiltersSchema } from '../schemas';

export type FlightFilters = z.infer<typeof flightFiltersSchema>;
