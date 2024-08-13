import { type Request, type Response } from 'express';
import * as z from 'zod';
import { getFlightQuery, getFlightsQuery } from '../queries';
import { flightFiltersSchema } from '../schemas';
import type {
    FlightFilters,
    GetFlightResponse,
    GetFlightsResponse,
} from '../types';

export class FlightController {
    getFlights = async (
        request: Request<{}, {}, {}, FlightFilters>,
        response: Response<GetFlightsResponse>,
    ) => {
        try {
            const validatedFilters = flightFiltersSchema.safeParse(
                request.query,
            );

            if (!validatedFilters.success)
                return response.json({
                    success: false,
                    error: 'Enter valid query data ..!',
                });

            const flights = await getFlightsQuery(validatedFilters.data);

            return response.json({
                success: true,
                flights,
            });
        } catch (error: any) {
            console.log(error);
            return response.json({
                success: false,
                error: 'Something went wrong..!',
            });
        }
    };

    getFlight = async (
        request: Request<{ id: string }>,
        response: Response<GetFlightResponse>,
    ) => {
        try {
            const validatedId = z.string().safeParse(request.params.id);

            if (!validatedId.success)
                return response.json({
                    success: false,
                    error: 'Enter valid param data(id) ..!',
                });

            const flight = await getFlightQuery(validatedId.data);

            return response.json({
                success: true,
                flight,
            });
        } catch (error) {
            return response.json({
                success: false,
                error: 'Something went wrong..!',
            });
        }
    };
}
