import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { GetDestinationResponse, GetDestinationsResponse } from '@/types';

const API_URL = import.meta.env.VITE_API_URL;

const destinationApi = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: `${API_URL || ''}/destinations`,
        credentials: 'include',
    }),
    reducerPath: 'destinationApi',
    endpoints(builder) {
        return {
            getDestinations: builder.query<GetDestinationsResponse, { page: number }>({
                query: (filters) => ({
                    method: 'GET',
                    url: '/',
                    params: filters,
                }),
            }),
            getDestination: builder.query<GetDestinationResponse, { iata: string }>({
                query: ({ iata }) => ({
                    method: 'GET',
                    url: `/${iata}`,
                }),
            }),
        };
    },
});

export { destinationApi };
