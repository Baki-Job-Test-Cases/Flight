import axios from 'axios';
import { stringifyObjectValues } from '../utils';
import type { Airline, Destination, Flight, FlightFilters } from '../types';

export const getFlightsQuery = async (
    filters: FlightFilters,
): Promise<Flight[] | undefined> => {
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

    return status === 204 ? [] : flights;
};

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

    return status === 204 ? {} : flight;
};

export const getDestinationsQuery = async (
    page: number,
): Promise<Destination[] | undefined> => {
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

export const getDestinationQuery = async (
    iata: string,
): Promise<Destination> => {
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

export const getAirlinesQuery = async (
    page: number,
): Promise<Airline[] | undefined> => {
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
