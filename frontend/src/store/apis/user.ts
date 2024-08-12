import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { AddFlightResponse, GetUserFlightsResponse } from '@/types';

const API_URL = import.meta.env.VITE_API_URL;

const userApi = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: `${API_URL || ''}/user`,
        credentials: 'include',
    }),
    reducerPath: 'userApi',
    tagTypes: ['Flight'],
    endpoints(builder) {
        return {
            getUserFlights: builder.query<GetUserFlightsResponse, void>({
                providesTags: ['Flight'],
                query: () => ({
                    method: 'GET',
                    url: '/flight',
                }),
            }),
            addFlight: builder.mutation<AddFlightResponse, { id: string }>({
                invalidatesTags: (result) =>
                    result && 'add' in result && result.add ? ['Flight'] : [],
                query: (payload) => ({
                    method: 'POST',
                    url: '/flight',
                    body: payload,
                }),
            }),
        };
    },
});

export { userApi };
