import axios from 'axios';
import { stringifyObjectValues } from '../utils';
import type { Airline } from '../types';

//Fetch Airlines
export const getAirlinesQuery = async (page: number): Promise<Airline[] | undefined> => {
    if (
        !process.env.SCHIPHOL_FLIGHT_APP_ID ||
        !process.env.SCHIPHOL_FLIGHT_APP_KEY ||
        !process.env.SCHIPHOL_FLIGHT_BASE_URL
    )
        throw new Error('Missing Flight Api Credentials...');

    const {
        data: { airlines },
        status,
    } = await axios.get<{ airlines?: Airline[] }>(
        `${process.env.SCHIPHOL_FLIGHT_BASE_URL}/airlines?${new URLSearchParams(stringifyObjectValues({ page }))}`,
        {
            headers: {
                resourceversion: 'v4',
                app_id: process.env.SCHIPHOL_FLIGHT_APP_ID,
                app_key: process.env.SCHIPHOL_FLIGHT_APP_KEY,
            },
        },
    );

    return status === 204 ? [] : airlines;
};

//Fetch Airline
export const getAirlineQuery = async (code: string): Promise<Airline> => {
    if (
        !process.env.SCHIPHOL_FLIGHT_APP_ID ||
        !process.env.SCHIPHOL_FLIGHT_APP_KEY ||
        !process.env.SCHIPHOL_FLIGHT_BASE_URL
    )
        throw new Error('Missing Flight Api Credentials...');

    const { data: airline, status } = await axios.get<Airline>(
        `${process.env.SCHIPHOL_FLIGHT_BASE_URL}/airlines/${code}`,
        {
            headers: {
                resourceversion: 'v4',
                app_id: process.env.SCHIPHOL_FLIGHT_APP_ID,
                app_key: process.env.SCHIPHOL_FLIGHT_APP_KEY,
            },
        },
    );

    return status === 204 ? {} : airline;
};
