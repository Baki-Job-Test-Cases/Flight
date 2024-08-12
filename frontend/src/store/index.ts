import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { airlineApi } from './apis/airline';
import { authApi } from './apis/auth';
import { destinationApi } from './apis/destination';
import { flightApi } from './apis/flight';
import { userApi } from './apis/user';
import { rateLimitMiddleware } from './middlewares/rateLimit';
import { sessionSlice } from './slices/session';

const store = configureStore({
    reducer: {
        [sessionSlice.name]: sessionSlice.reducer,
        [authApi.reducerPath]: authApi.reducer,
        [flightApi.reducerPath]: flightApi.reducer,
        [destinationApi.reducerPath]: destinationApi.reducer,
        [airlineApi.reducerPath]: airlineApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
    },
    middleware(getDefaultMiddleware) {
        return getDefaultMiddleware({
            serializableCheck: false,
        })
            .concat(authApi.middleware)
            .concat(flightApi.middleware)
            .concat(destinationApi.middleware)
            .concat(airlineApi.middleware)
            .concat(userApi.middleware)
            .concat(rateLimitMiddleware);
    },
});

setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export { store };
export const { useSignInMutation, useSignUpMutation, useSignOutMutation, useVerifyMutation } =
    authApi;
export const { useLazyGetFlightQuery, useLazyGetFlightsQuery } = flightApi;
export const { useLazyGetDestinationQuery, useLazyGetDestinationsQuery } = destinationApi;
export const { useLazyGetAirlineQuery, useLazyGetAirlinesQuery } = airlineApi;
export const { useAddFlightMutation, useGetUserFlightsQuery } = userApi;
export const { update } = sessionSlice.actions;
