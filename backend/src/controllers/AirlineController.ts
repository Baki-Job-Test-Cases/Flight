import { type Request, type Response } from 'express';
import * as z from 'zod';
import { getAirlineQuery, getAirlinesQuery } from '../queries';
import type { GetAirlineResponse, GetAirlinesResponse } from '../types';

export class AirlineController {
    getAirlines = async (
        request: Request<{}, {}, {}, { page: string }>,
        response: Response<GetAirlinesResponse>,
    ) => {
        try {
            //Validate Queries
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

            //Fetch Airlines
            const airlines = await getAirlinesQuery(validatedPageNumber.data);

            return response.json({
                success: true,
                airlines,
            });
        } catch (error) {
            return response.json({
                success: false,
                error: 'Something went wrong..!',
            });
        }
    };
    getAirline = async (
        request: Request<{ code: string }>,
        response: Response<GetAirlineResponse>,
    ) => {
        try {
            //Validate Params
            const validatedCode = z
                .string()
                .min(2)
                .max(4)
                .safeParse(request.params.code);

            if (!validatedCode.success)
                return response.json({
                    success: false,
                    error: 'Enter valid params data ..!',
                });

            //Fetch Airline
            const airline = await getAirlineQuery(validatedCode.data);

            return response.json({
                success: true,
                airline,
            });
        } catch (error) {
            return response.json({
                success: false,
                error: 'Something went wrong..!',
            });
        }
    };
}
