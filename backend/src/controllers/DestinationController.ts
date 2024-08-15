import { type Request, type Response } from 'express';
import * as z from 'zod';
import { getDestinationQuery, getDestinationsQuery } from '../queries';
import type { GetDestinationResponse, GetDestinationsResponse } from '../types';

export class DestinationController {
    getDestinations = async (
        request: Request<{}, {}, {}, { page: string }>,
        response: Response<GetDestinationsResponse>,
    ) => {
        try {
            //Validate request query
            const validatedPageNumber = z.coerce
                .number()
                .min(0)
                .max(499)
                .default(0)
                .safeParse(request.query.page);

            if (!validatedPageNumber.success)
                return response.json({
                    success: false,
                    error: 'Enter valid query data ..!',
                });

            //Fetch destinations
            const destinations = await getDestinationsQuery(validatedPageNumber.data);

            return response.json({
                success: true,
                destinations,
            });
        } catch (error) {
            return response.json({
                success: false,
                error: 'Something went wrong..!',
            });
        }
    };
    getDestination = async (
        request: Request<{ iata: string }>,
        response: Response<GetDestinationResponse>,
    ) => {
        try {
            //Validate request params
            const validatedIata = z.string().length(3).safeParse(request.params.iata);

            if (!validatedIata.success)
                return response.json({
                    success: false,
                    error: 'Enter valid params data ..!',
                });

            //Fetch destination
            const destination = await getDestinationQuery(validatedIata.data);

            return response.json({
                success: true,
                destination,
            });
        } catch (error) {
            return response.json({
                success: false,
                error: 'Something went wrong..!',
            });
        }
    };
}
