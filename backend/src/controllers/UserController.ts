import * as z from 'zod';
import db from '../db';
import { getFlightQuery } from '../queries';
import type { Request, Response } from 'express';
import type { AddFlightResponse, GetUserFlightsResponse } from '../types';

export class UserController {
    addFlight = async (
        request: Request<{}, {}, { id: string }>,
        response: Response<AddFlightResponse>,
    ) => {
        try {
            const { user } = request;

            if (!user)
                return response.json({
                    add: false,
                    error: 'You have no authorization..!',
                });

            //Validate request body
            const validatedFlightId = z.object({ id: z.string() }).safeParse(request.body);

            if (!validatedFlightId.success)
                return response.json({
                    add: false,
                    error: 'Enter valid data..!',
                });

            //Fetch flight for control flight existence
            const flight = await getFlightQuery(validatedFlightId.data.id);

            if (!flight.id)
                return response.json({
                    add: false,
                    error: 'Not exists flight..!',
                });

            //Check if the user has booked the flight
            if (user.flights.includes(flight.id))
                return response.json({
                    add: false,
                    error: 'This flight has already been added..!',
                });

            //Check flight date
            if (flight.scheduleDateTime && new Date(flight.scheduleDateTime) < new Date())
                return response.json({
                    add: false,
                    error: 'You cant book passed flight..!',
                });

            //Update database
            await db.user.update({
                where: { id: user.id, email: user.email },
                data: {
                    flights: [...user.flights, flight.id],
                },
            });

            return response.json({
                add: true,
            });
        } catch (error) {
            return response.json({
                add: false,
                error: 'Something went wrong...',
            });
        }
    };
    getFlights = async (request: Request, response: Response<GetUserFlightsResponse>) => {
        try {
            const { user } = request;

            if (!user)
                return response.json({
                    success: false,
                    error: 'You have no authorization..!',
                });

            if (user.flights.length < 1)
                return response.json({
                    success: true,
                    flights: [],
                });

            //Fetch Flights
            const extendedFlights = await Promise.all(
                user.flights.map((flightId) => getFlightQuery(flightId)),
            );

            return response.json({
                success: true,
                flights: extendedFlights,
            });
        } catch (error) {
            return response.json({
                success: false,
                error: 'Something went wrong...!',
            });
        }
    };
}
