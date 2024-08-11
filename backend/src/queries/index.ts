import axios from 'axios';
import { stringifyObjectValues } from '../utils';
import type { Destination, Flight, FlightFilters } from '../types';

const BASE_URL = 'https://api.schiphol.nl/public-flights';

export const getFlightsQuery = async (
    filters: FlightFilters,
): Promise<Flight[]> => {
    if (
        !process.env.SCHIPHOL_FLIGHT_APP_ID ||
        !process.env.SCHIPHOL_FLIGHT_APP_KEY
    )
        throw new Error('Missing Flight Api Credentials...');

    const {
        data: { flights },
        status,
    } = await axios.get<{ flights: Flight[] }>(
        `${BASE_URL}/flights?${new URLSearchParams(stringifyObjectValues(filters))}`,
        {
            headers: {
                resourceversion: 'v4',
                app_id: process.env.SCHIPHOL_FLIGHT_APP_ID,
                app_key: process.env.SCHIPHOL_FLIGHT_APP_KEY,
            },
        },
    );

    return status === 204 ? [] : flights;
};

export const getFlightQuery = async (id: number): Promise<Flight> => {
    if (
        !process.env.SCHIPHOL_FLIGHT_APP_ID ||
        !process.env.SCHIPHOL_FLIGHT_APP_KEY
    )
        throw new Error('Missing Flight Api Credentials...');
    console.log(`${BASE_URL}/flights/${id}`);
    const { data: flight, status } = await axios.get<Flight>(
        `${BASE_URL}/flights/${id}`,
        {
            headers: {
                resourceversion: 'v4',
                app_id: process.env.SCHIPHOL_FLIGHT_APP_ID,
                app_key: process.env.SCHIPHOL_FLIGHT_APP_KEY,
            },
        },
    );

    return status === 204 ? {} : flight;
};

export const getDestinationsQuery = async (
    page: number,
): Promise<Destination[]> => {
    if (
        !process.env.SCHIPHOL_FLIGHT_APP_ID ||
        !process.env.SCHIPHOL_FLIGHT_APP_KEY
    )
        throw new Error('Missing Flight Api Credentials...');

    const {
        data: { destinations },
        status,
    } = await axios.get<{
        destinations: Destination[];
    }>(
        `${BASE_URL}/destinations?${new URLSearchParams(stringifyObjectValues({ page }))}`,
        {
            headers: {
                resourceversion: 'v4',
                app_id: process.env.SCHIPHOL_FLIGHT_APP_ID,
                app_key: process.env.SCHIPHOL_FLIGHT_APP_KEY,
            },
        },
    );

    return status === 204 ? [] : destinations;
};

export const getDestinationQuery = async (
    iata: string,
): Promise<Destination> => {
    if (
        !process.env.SCHIPHOL_FLIGHT_APP_ID ||
        !process.env.SCHIPHOL_FLIGHT_APP_KEY
    )
        throw new Error('Missing Flight Api Credentials...');

    const { data: destination, status } = await axios.get<Destination>(
        `${BASE_URL}/destinations/${iata}`,
        {
            headers: {
                resourceversion: 'v4',
                app_id: process.env.SCHIPHOL_FLIGHT_APP_ID,
                app_key: process.env.SCHIPHOL_FLIGHT_APP_KEY,
            },
        },
    );

    return status === 204 ? {} : destination;
};
