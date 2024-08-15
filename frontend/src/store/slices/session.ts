import { createSlice } from '@reduxjs/toolkit';
import { authApi } from '../apis/auth';
import { userApi } from '../apis/user';
import type { Session, User } from '@/types';
import type { PayloadAction } from '@reduxjs/toolkit';

const initialState: Session = {
    status: 'unauthenticated',
    data: null,
};

const sessionSlice = createSlice({
    name: 'session',
    initialState,
    reducers: {
        update: (state, action: PayloadAction<User | undefined>) => {
            if (!action.payload) return initialState;

            state.data = action.payload;
        },
    },
    extraReducers(builder) {
        builder.addMatcher(authApi.endpoints.signIn.matchFulfilled, (state, action) => {
            if (action.payload.signIn) {
                return {
                    ...state,
                    status: 'authenticated',
                    data: action.payload.user,
                };
            }
        });
        builder.addMatcher(authApi.endpoints.signUp.matchFulfilled, (state, action) => {
            if (action.payload.signUp) {
                return {
                    ...state,
                    status: 'authenticated',
                    data: action.payload.user,
                };
            }
        });
        builder.addMatcher(authApi.endpoints.verify.matchPending, (state) => {
            state.status = 'loading';
        });
        builder.addMatcher(authApi.endpoints.verify.matchFulfilled, (state, action) => {
            if ('verify' in action.payload && action.payload.verify) {
                return {
                    ...state,
                    status: 'authenticated',
                    data: action.payload.user,
                };
            }
        });
        builder.addMatcher(userApi.endpoints.addFlight.matchFulfilled, (state, action) => {
            if ('add' in action.payload && action.payload.add) {
                state.data?.flights.push(action.payload.id);
            }
        });
    },
});

export { sessionSlice };
