import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type {
    SignInForm,
    SignInResponse,
    SignOutResponse,
    SignUpResponse,
    VerifyResponse,
} from '@/types';

const API_URL = import.meta.env.VITE_API_URL;

const authApi = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: API_URL || '',
        credentials: 'include',
    }),
    reducerPath: 'authApi',
    endpoints(builder) {
        return {
            signIn: builder.mutation<SignInResponse, SignInForm>({
                query: (form) => ({
                    url: '/signin',
                    method: 'POST',
                    body: form,
                }),
            }),
            signUp: builder.mutation<SignUpResponse, SignInForm>({
                query: (form) => ({
                    url: '/signup',
                    method: 'POST',
                    body: form,
                }),
            }),
            signOut: builder.mutation<SignOutResponse, void>({
                query: () => ({
                    url: '/signout',
                    method: 'POST',
                }),
            }),
            verify: builder.mutation<VerifyResponse, void>({
                query: () => ({
                    url: '/verify',
                    method: 'POST',
                }),
            }),
        };
    },
});

export { authApi };
export const { useSignInMutation, useSignUpMutation, useSignOutMutation, useVerifyMutation } =
    authApi;
