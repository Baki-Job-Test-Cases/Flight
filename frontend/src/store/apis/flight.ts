import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { FlightFilters, GetFlightResponse, GetFlightsResponse } from '@/types';

const API_URL = import.meta.env.VITE_API_URL;

const flightApi = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: `${API_URL || ''}/flights`,
        credentials: 'include',
    }),
    reducerPath: 'flightApi',
    endpoints(builder) {
        return {
            getFlights: builder.query<GetFlightsResponse, FlightFilters>({
                query: (filters) => ({
                    method: 'GET',
                    url: '/',
                    params: filters,
                }),
            }),
            getFlight: builder.query<GetFlightResponse, { id: string }>({
                query: ({ id }) => ({
                    method: 'GET',
                    url: `/${id}`,
                }),
            }),
        };
    },
});

export { flightApi };
