import { compare, hash } from 'bcryptjs';
import db from '../db';
import { signInSchema, signUpSchema } from '../schemas';
import {
    clearTokenCookies,
    createAccessTokenCookies,
    createRefreshTokenCookie,
} from '../utils';
import type { Request, Response } from 'express';
import type {
    SignInForm,
    SignInResponse,
    SignOutResponse,
    SignUpForm,
    SignUpResponse,
    VerifyResponse,
} from '../types';

export class AuthController {
    async signUp(
        request: Request<{}, {}, SignUpForm>,
        response: Response<SignUpResponse>,
    ) {
        //Validate request body
        const validatedForm = signUpSchema.safeParse(request.body);

        if (!validatedForm.success)
            return response.json({
                signUp: false,
                error: 'Enter valid form data ..!',
            });

        try {
            //Registered user control via email
            const user = await db.user.findFirst({
                where: { email: validatedForm.data.email },
            });

            if (user)
                return response.json({
                    signUp: false,
                    error: 'Another user is registered with this email..!',
                });

            //Hash pasword
            const hashedPassword = await hash(validatedForm.data.password, 15);
            const { confirmPassword, ...formWithoutConfirm } =
                validatedForm.data;

            //Insert new user
            const newUser = await db.user.create({
                data: {
                    ...formWithoutConfirm,
                    password: hashedPassword,
                    flights: [],
                },
            });
            const { password, ...newUserWithoutUser } = newUser;

            //Create and set auth tokens to response
            createAccessTokenCookies(response, {
                id: newUserWithoutUser.id,
                email: newUserWithoutUser.email,
            });
            createRefreshTokenCookie(response, {
                id: newUserWithoutUser.id,
                email: newUserWithoutUser.email,
            });

            return response.json({
                signUp: true,
                user: newUserWithoutUser,
            });
        } catch (error) {
            return response.json({
                signUp: false,
                error: 'Something went wrong..!',
            });
        }
    }
    async signIn(
        request: Request<{}, {}, SignInForm>,
        response: Response<SignInResponse>,
    ) {
        try {
            //Validate request body
            const validatedFormData = signInSchema.safeParse(request.body);

            if (!validatedFormData.success)
                return response.json({
                    signIn: false,
                    error: 'Enter valid form data ..!',
                });

            //Registered user control via email
            const user = await db.user.findFirst({
                where: {
                    email: validatedFormData.data.email,
                },
            });

            if (!user)
                return response.json({
                    signIn: false,
                    error: 'Invalid email or password..!',
                });

            //Password control
            const isPasswordMatch = await compare(
                validatedFormData.data.password,
                user.password,
            );

            if (!isPasswordMatch)
                return response.json({
                    signIn: false,
                    error: 'Invalid email or password..!',
                });

            const { password, ...userWithoutPassword } = user;

            //Create and set auth tokens to response
            createAccessTokenCookies(response, {
                id: userWithoutPassword.id,
                email: userWithoutPassword.email,
            });
            createRefreshTokenCookie(response, {
                id: userWithoutPassword.id,
                email: userWithoutPassword.email,
            });

            return response.json({
                signIn: true,
                user: userWithoutPassword,
            });
        } catch (error) {
            return response.json({
                signIn: false,
                error: 'Something went wrong..!',
            });
        }
    }
    async signOut(request: Request, response: Response<SignOutResponse>) {
        try {
            //Set tokens with 0 expire for response
            clearTokenCookies(response);

            return response.json({ signOut: true });
        } catch (error) {
            return response.json({
                signOut: false,
                error: 'Something went wrong..!',
            });
        }
    }
    async verify(request: Request, response: Response<VerifyResponse>) {
        try {
            if (!request.user)
                return response.json({
                    verify: false,
                    error: 'Tokens issued are not valid..!',
                });

            return response.json({
                verify: true,
                user: request.user,
            });
        } catch (error) {
            //Set tokens with 0 expire
            clearTokenCookies(response);

            response.json({ verify: false, error: 'Something went wrong..!' });
        }
    }
}
