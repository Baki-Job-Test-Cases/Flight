import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { GetAirlineResponse, GetAirlinesResponse } from '@/types';

const API_URL = import.meta.env.VITE_API_URL;

const airlineApi = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: `${API_URL || ''}/airlines`,
        credentials: 'include',
    }),
    reducerPath: 'airlineApi',
    endpoints(builder) {
        return {
            getAirlines: builder.query<GetAirlinesResponse, { page: number }>({
                query: (filters) => ({
                    method: 'GET',
                    url: '/',
                    params: filters,
                }),
            }),
            getAirline: builder.query<GetAirlineResponse, { code: string }>({
                query: ({ code }) => ({
                    method: 'GET',
                    url: `/${code}`,
                }),
            }),
        };
    },
});

export { airlineApi };
