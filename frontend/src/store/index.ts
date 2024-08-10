import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { authApi } from './apis/authApi';
import { rateLimitMiddleware } from './middlewares/rateLimit';
import { sessionSlice } from './slices/session';

const store = configureStore({
    reducer: {
        [sessionSlice.name]: sessionSlice.reducer,
        [authApi.reducerPath]: authApi.reducer,
    },
    middleware(getDefaultMiddleware) {
        return getDefaultMiddleware()
            .concat(authApi.middleware)
            .concat(rateLimitMiddleware);
    },
});

setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export { store };
export {
    useSignInMutation,
    useSignUpMutation,
    useSignOutMutation,
    useVerifyMutation,
} from './apis/authApi';
export const { update } = sessionSlice.actions;
