import { createSlice } from '@reduxjs/toolkit';
import { authApi } from '../apis/authApi';
import type { Session } from '@/types';
import type { PayloadAction } from '@reduxjs/toolkit';

const initialState: Session = {
    status: 'unauthenticated',
    data: null,
};

const sessionSlice = createSlice({
    name: 'session',
    initialState,
    reducers: {
        update: (_, action: PayloadAction<Session | undefined>) => {
            return action.payload ?? initialState;
        },
    },
    extraReducers(builder) {
        builder.addMatcher(
            authApi.endpoints.signIn.matchFulfilled,
            (state, action) => {
                if (action.payload.signIn) {
                    return {
                        ...state,
                        status: 'authenticated',
                        data: action.payload.user,
                    };
                }
            },
        );
        builder.addMatcher(
            authApi.endpoints.signUp.matchFulfilled,
            (state, action) => {
                if (action.payload.signUp) {
                    return {
                        ...state,
                        status: 'authenticated',
                        data: action.payload.user,
                    };
                }
            },
        );
        // builder.addMatcher(
        //     authApi.endpoints.signOut.matchFulfilled,
        //     (_, action) => {
        //         if (action.payload.signOut) {
        //             return initialState;
        //         }
        //     },
        // );
        builder.addMatcher(authApi.endpoints.verify.matchPending, (state) => {
            state.status = 'loading';
        });
        builder.addMatcher(
            authApi.endpoints.verify.matchFulfilled,
            (state, action) => {
                if ('verify' in action.payload && action.payload.verify) {
                    return {
                        ...state,
                        status: 'authenticated',
                        data: action.payload.user,
                    };
                }
            },
        );
    },
});

export { sessionSlice };
