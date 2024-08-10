import { type Request, type Response } from 'express';
import { flightFiltersSchema } from '../schemas';
import { stringifyObjectValues } from '../utils';
import type { Flight, FlightFilters, SearchFlightResponse } from '../types';

export class FlightController {
    protected baseUrl: string = 'https://api.schiphol.nl/public-flights';

    constructor(
        private apiId: string,
        private apiKey: string,
    ) {}

    searchFlight = async (
        request: Request<{}, {}, {}, FlightFilters>,
        response: Response<SearchFlightResponse>,
    ) => {
        try {
            const validatedFilters = flightFiltersSchema.safeParse(
                request.query,
            );

            if (!validatedFilters.success)
                return response.json({
                    search: false,
                    error: 'Enter valid query data ..!',
                });

            const flightResponse = await fetch(
                `${this.baseUrl}/flights?${new URLSearchParams(stringifyObjectValues(validatedFilters.data))}`,
                {
                    method: 'GET',
                    headers: {
                        resourceversion: 'v4',
                        app_id: this.apiId,
                        app_key: this.apiKey,
                        'Content-Type': 'application/json',
                    },
                },
            );

            if (!flightResponse.ok) throw new Error();
            if (flightResponse.status === 204)
                return response.json({
                    search: true,
                    flights: [],
                });

            const flights = (await flightResponse.json()) as Flight[];

            return response.json({
                search: true,
                flights,
            });
        } catch (error) {
            return response.json({
                search: false,
                error: 'Something went wrong..!',
            });
        }
    };
}
