import axios from 'axios';
import { stringifyObjectValues } from '../utils';
import type { Destination } from '../types';

//Fetch Destinations
export const getDestinationsQuery = async (page: number): Promise<Destination[] | undefined> => {
    if (
        !process.env.SCHIPHOL_FLIGHT_APP_ID ||
        !process.env.SCHIPHOL_FLIGHT_APP_KEY ||
        !process.env.SCHIPHOL_FLIGHT_BASE_URL
    )
        throw new Error('Missing Flight Api Credentials...');

    const {
        data: { destinations },
        status,
    } = await axios.get<{
        destinations?: Destination[];
    }>(
        `${process.env.SCHIPHOL_FLIGHT_BASE_URL}/destinations?${new URLSearchParams(stringifyObjectValues({ page }))}`,
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

//Fetch Destination
export const getDestinationQuery = async (iata: string): Promise<Destination> => {
    if (
        !process.env.SCHIPHOL_FLIGHT_APP_ID ||
        !process.env.SCHIPHOL_FLIGHT_APP_KEY ||
        !process.env.SCHIPHOL_FLIGHT_BASE_URL
    )
        throw new Error('Missing Flight Api Credentials...');

    const { data: destination, status } = await axios.get<Destination>(
        `${process.env.SCHIPHOL_FLIGHT_BASE_URL}/destinations/${iata}`,
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
