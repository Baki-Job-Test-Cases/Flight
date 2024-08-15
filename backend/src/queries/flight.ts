import axios from 'axios';
import { extendFlight, stringifyObjectValues } from '../utils';
import type { Flight, FlightFilters } from '../types';

//Fetch Flights
export const getFlightsQuery = async (filters: FlightFilters): Promise<Flight[] | undefined> => {
    if (
        !process.env.SCHIPHOL_FLIGHT_APP_ID ||
        !process.env.SCHIPHOL_FLIGHT_APP_KEY ||
        !process.env.SCHIPHOL_FLIGHT_BASE_URL
    )
        throw new Error('Missing Flight Api Credentials...');

    const {
        data: { flights },
        status,
    } = await axios.get<{ flights?: Flight[] }>(
        `${process.env.SCHIPHOL_FLIGHT_BASE_URL}/flights?${new URLSearchParams(stringifyObjectValues(filters))}`,
        {
            headers: {
                resourceversion: 'v4',
                app_id: process.env.SCHIPHOL_FLIGHT_APP_ID,
                app_key: process.env.SCHIPHOL_FLIGHT_APP_KEY,
            },
        },
    );

    if (flights && status !== 204) {
        for (const flight of flights) {
            await extendFlight(flight, { destinations: true });
        }
    }

    return status === 204 ? [] : flights;
};

//Fetch Flight
export const getFlightQuery = async (id: string): Promise<Flight> => {
    if (
        !process.env.SCHIPHOL_FLIGHT_APP_ID ||
        !process.env.SCHIPHOL_FLIGHT_APP_KEY ||
        !process.env.SCHIPHOL_FLIGHT_BASE_URL
    )
        throw new Error('Missing Flight Api Credentials...');

    const { data: flight, status } = await axios.get<Flight>(
        `${process.env.SCHIPHOL_FLIGHT_BASE_URL}/flights/${id}`,
        {
            headers: {
                resourceversion: 'v4',
                app_id: process.env.SCHIPHOL_FLIGHT_APP_ID,
                app_key: process.env.SCHIPHOL_FLIGHT_APP_KEY,
            },
        },
    );

    if (flight && status !== 204) {
        await extendFlight(flight, { airline: true, destinations: true });
    }

    return status === 204 ? {} : flight;
};
